// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @fileOverview handle all the resources for the different applications.
 * @version 1.136.1
 */
sap.ui.define([
    "sap/base/Log",
    "sap/base/util/Deferred",
    "sap/ui/core/EventBus",
    "sap/ushell/Container",
    "sap/ushell/UI5ComponentType",
    "sap/ushell/utils",
    "sap/ushell/utils/UrlParsing"
], function (
    Log,
    Deferred,
    EventBus,
    Container,
    UI5ComponentType,
    ushellUtils,
    UrlParsing
) {
    "use strict";

    class EmbeddedUI5Handler {
        async createApp (oApplicationContainer, oResolvedHashFragment, oParsedShellHash) {
            const sTargetUi5ComponentName = oResolvedHashFragment?.ui5ComponentName;
            // todo: [FLPCOREANDUX-10024] check comment below
            /*
             * normal application:
             * fire the _prior.newUI5ComponentInstantion event before creating the new component instance, so that
             * the ApplicationContainer can stop the router of the current app (avoid inner-app hash change notifications)
             * NOTE: this dependency to the ApplicationContainer is not nice, but we need a fast fix now; we should refactor
             * the ApplicationContainer code, because most of the logic has to be done by the shell controller;
             * maybe rather introduce a utility module
             */
            EventBus.getInstance().publish("ApplicationContainer", "_prior.newUI5ComponentInstantion",
                { name: sTargetUi5ComponentName }
            );

            /*
             * FIXME: It would be better to call a function that simply
             * and intentionally loads the dependencies of the UI5
             * application, rather than creating a component and expecting
             * the dependencies to be loaded as a side effect.
             * Moreover, the comment reads "load ui5 component via shell service"
             * however that is 'not needed' since the loaded component
             * is not used. We should evaluate the possible performance
             * hit taken due to this implicit means to an end.
             */
            // load ui5 component via shell service; core-ext-light will be loaded as part of the asyncHints
            const Ui5ComponentLoader = await Container.getServiceAsync("Ui5ComponentLoader");

            const sBasicHash = UrlParsing.getBasicHash(oResolvedHashFragment.sFixedShellHash);
            oResolvedHashFragment.ui5ComponentId = `application-${sBasicHash}-component`;
            oApplicationContainer.setUi5ComponentId(oResolvedHashFragment.ui5ComponentId);

            await Ui5ComponentLoader.createComponent(
                oResolvedHashFragment,
                oParsedShellHash,
                [this.#getRenderCreatedPromise()],
                UI5ComponentType.Application
            );
        }

        #getRenderCreatedPromise () {
            const oRenderer = Container.getRendererInternal();
            if (oRenderer) {
                // should always be the case except initial start; in this case, we return an empty array to avoid delays by an additional async operation
                Log.debug("Shell controller._createWaitForRendererCreatedPromise: shell renderer already created, return empty array.");
                return [];
            }

            const oDeferred = new Deferred();
            const fnResolve = oDeferred.resolve.bind(oDeferred);
            Container.attachRendererCreatedEvent(fnResolve);
            return oDeferred.promise.then(() => {
                Log.info("Shell controller: resolving component waitFor promise after shell renderer created event fired.");
                Container.detachRendererCreatedEvent(fnResolve);
            });
        }

        async getNavigationRedirectHash (oApplicationContainer) {
            const oComponentHandle = oApplicationContainer.getComponentHandle();
            if (!oComponentHandle) {
                return;
            }

            const oComponent = oComponentHandle.getInstance({});
            if (!oComponent) {
                return;
            }

            if (typeof oComponent.navigationRedirect !== "function") {
                return;
            }

            // oComponent refers to a trampoline application
            const oNavRedirectThenable = oComponent.navigationRedirect();
            if (!oNavRedirectThenable || typeof oNavRedirectThenable.then !== "function") {
                return;
            }

            try {
                const sHash = await ushellUtils.promisify(oNavRedirectThenable);
                return sHash;
            } catch {
                // fail silently
            }
        }

        async storeApp (oApplicationContainer) {
            const oResolvedHashFragment = oApplicationContainer.getCurrentAppTargetResolution();
            EventBus.getInstance().publish("sap.ushell", "appKeepAliveDeactivate", oResolvedHashFragment);

            const oComponentHandle = oApplicationContainer.getComponentHandle();
            const oComponent = oComponentHandle.getInstance();

            // check first whether this app requires activate/deactivate
            if (oComponent.isKeepAliveSupported?.()) {
                oComponent.deactivate();
                return;
            }

            // fallback to suspend/restore
            if (typeof oComponent.suspend === "function") {
                oComponent.suspend();
            }

            const oRouter = oComponent.getRouter?.();
            if (oRouter && typeof oRouter.stop === "function") {
                oRouter.stop();
            }
        }

        async restoreAppAfterNavigate (oApplicationContainer, oStorageEntry) {
            const oResolvedHashFragment = oApplicationContainer.getCurrentAppTargetResolution();
            EventBus.getInstance().publish("sap.ushell", "appKeepAliveActivate", oResolvedHashFragment);

            const oComponentHandle = oApplicationContainer.getComponentHandle();
            const oComponent = oComponentHandle.getInstance();

            // check first whether this app requires activate/deactivate
            if (oComponent.isKeepAliveSupported?.()) {
                oComponent.activate();
                return;
            }

            // fallback to suspend/restore
            if (typeof oComponent.restore === "function") {
                oComponent.restore();
            }

            const oRouter = oComponent.getRouter?.();
            if (oRouter && typeof oRouter.initialize === "function") {
                if (oStorageEntry.enableRouterRetrigger === false) {
                    oRouter.initialize();
                } else {
                    oRouter.initialize(true);
                }
            }

            if (typeof oComponent.setInitialConfiguration === "function") {
                oComponent.setInitialConfiguration();
            }
        }
    }

    return new EmbeddedUI5Handler();

});
