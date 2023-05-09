import { useRef,useState,useCallback,forwardRef,useImperativeHandle, useEffect } from "react";
import React from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    GammaCorrectionPlugin,
    BloomPlugin,
    CanvasSnipperPlugin,
    AssetManagerBasicPopupPlugin,
    addBasePlugins,
    mobileAndTabletCheck

} from "webgi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 gsap.registerPlugin(ScrollTrigger);
function WebgiViewer() {

    const canvasref =  useRef(null);
    const setupViewer = useCallback (async () => {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasref.current,
        })
    
        // Add some plugins
        const manager = await viewer.addPlugin(AssetManagerPlugin)
        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;
        // Add a popup(in HTML) with download progress when any asset is downloading.
        await viewer.addPlugin(AssetManagerBasicPopupPlugin)
    
        // Add plugins individually.
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true));
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)

        await addBasePlugins(viewer)
        // This must be called once after all plugins are added.
        viewer.renderer.refreshPipeline()
        await viewer.addPlugin(CanvasSnipperPlugin)
    
        await manager.addFromPath("scene-black.glb");
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        viewer.scene.activeCamera.setCameraOptions({controlsEnabled:false});
        window.screenTop(0,0);

        let needUpdate = true;
        viewer.addEventListener("preFrame",()=>{
            if(needUpdate){
            camera.positionTargetUpdated(true);
            needUpdate = false;
            }
        })
 
   
       
    },[]);

    useEffect(()=>{
        setupViewer()
    },[]);
    

    return (  
        <div id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasref}></canvas>
        </div>
    );
}

export default WebgiViewer;