import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { CoordinateType } from '../../../models';


function ModalMap({ coordinate }: { coordinate: CoordinateType }) {
    return (
        <YMaps>
            <div style={{ height: '300px', width: '300px', padding: '10px', borderRadius: '6px', boxShadow: '0px 0px 8px 0px rgba(34, 60, 80, 0.2)' }}>
                <Map defaultState={{ center: [coordinate.latitude, coordinate.longitude], zoom: 11 }} width="100%" height="100%">
                    <Placemark geometry={[coordinate.latitude, coordinate.longitude]} />
                </Map>
            </div>
        </YMaps>
    );
}

export default ModalMap;
