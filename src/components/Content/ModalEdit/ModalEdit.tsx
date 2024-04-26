import { useState } from 'react'
import { Car, ModalEditProps } from '../../../models'
import classes from './ModalEdit.module.scss'

const ModalEdit = (props : ModalEditProps) => {

    const [name, setName] = useState<string>(props.car?.name ?? "")
    const [model, setModel] = useState<string>(props.car?.model ?? "")
    const [price, setPrice] = useState<number>(props.car?.price ?? 0)

    const onClickBackground = () => {
        props.closeModalWindow()
    }

    const onClickSave = () => {
        const newCar : Car | undefined = props.car ? {...props.car, name: name, model: model, price: price} : undefined
        if (newCar) {
            props.saveNewValues(newCar)
        }
    }

    const onClickDelete = () => {
        if (props.car) {
            props.deleteCar(props.car?.id)
        }
    }

    return (
        <div className={classes.background} onClick={onClickBackground}>
            <div className={classes.container} onClick={(e) => e.stopPropagation()}>
                <div className={classes.title}>Редактирование</div>
                <div className={classes.input_block}>
                    <div className={classes.input_title}>
                        Марка
                    </div>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={classes.input_block}>
                    <div className={classes.input_title}>
                        Модель 
                    </div>
                    <input type='text' value={model} onChange={(e) => setModel(e.target.value)}/>
                </div><div className={classes.input_block}>
                    <div className={classes.input_title}>
                        Цена
                    </div>
                    <input type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
                </div>
                <div className={classes.actions}>
                    <button onClick={onClickSave}>Сохранить</button>
                    <button onClick={onClickDelete}>Удалить</button>
                </div>
            </div>
        </div>
    )

}

export default ModalEdit