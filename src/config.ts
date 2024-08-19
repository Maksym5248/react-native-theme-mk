import type { IDimensionDesignedDevice } from './types';

////////////////////////////////////////////////////////////////
//        iOS                   Android                       //
//  ----------------        --------------------              //
//  |               |       |  Status Bar   |                 //
//  |               |       | --------------|                 //
//  |               |       |               |                 //
//  |               |       |               |                 //
//  | Screen Height |       |               |                 //
//  |      =        |       | Window Height | Screen Height   //
//  | Window Height |       |               |                 //
//  |               |       |               |                 //
//  |               |       |               |                 //
//  |               |       | ------------- |                 //
//  |               |       | Navigation.Bar|                 //
//  ----------------        --------------------              //
//                                                            //
////////////////////////////////////////////////////////////////

export const dimensionsDesignedDeviceConfig: IDimensionDesignedDevice = {
    width: 375,
    height: 812,
};
