import { Car, CardProps } from "../../../models"
import classes from './Card.module.scss'
import { ReactComponent as CarSVG } from '../../../images/car.svg'
import { ReactComponent as MapSVG } from '../../../images/map.svg'
import { ReactComponent as EditSVG } from '../../../images/edit.svg'
import ModalMap from "../ModalMap/ModalMap"
import { useEffect, useRef, useState } from "react"

const Card : React.FC<CardProps> = ({car, setEditIdCar, setIsEdit}) => {

    const mapRef = useRef<HTMLDivElement>(null);

    const [visibleMap, setVisibleMap] = useState<boolean>(false)
    const [modalTop, setModalTop] = useState<string>('54px')

    const onEnterActionMap = () => {
        setVisibleMap(true)
    }

    const onLeaveActionMap = () => {
        setVisibleMap(false)
    }

    const onClickEdit = () => {
        setEditIdCar(car.id)
        setIsEdit(true)
    }

    useEffect(() => {
        if (mapRef.current) {

            const rect = mapRef.current.getBoundingClientRect();
            
            if (rect.top < 300) {
                setModalTop('64px')
            } else {
                setModalTop('-300px')
            }
        }
    }, [visibleMap])

    return (
        <div className={classes.container}>
            <div className={classes.color + ' ' + classes.item}>
                <CarSVG fill={car.color} height={'50px'} width={'50px'} className={car.color === 'white' ? classes.whitesvg : ''} />
            </div>
            <div className={classes.name + ' ' + classes.item}>
                {car.name + ' ' + car.model}
            </div>
            <div className={classes.year + ' ' + classes.item}>
                {car.year}
            </div>
            <div className={classes.price + ' ' + classes.item}>
                {`${car.price} ₽`}
            </div>
            <div className={classes.actions}>
                <div ref={mapRef} className={classes.map + ' ' + classes.item} onMouseEnter={onEnterActionMap} onMouseLeave={onLeaveActionMap}>
                    <MapSVG height={'25px'} width={'25px'} />
                    {
                        visibleMap && (
                            <div  className={classes.modalmap} style={{top: modalTop}}>
                                <ModalMap coordinate={{longitude: car.longitude, latitude: car.latitude}} />
                            </div>
                        )
                    }
                </div>
                <div className={classes.edit + ' ' + classes.item} onClick={onClickEdit}>
                    <EditSVG height={'25px'} width={'25px'}/>
                </div>
            </div>
        </div>
    )
}

export default Card