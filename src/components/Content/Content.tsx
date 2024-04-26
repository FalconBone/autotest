import { useEffect, useState } from 'react'
import classes from './Content.module.scss'
import axios from 'axios'
import { Car, OptionType } from '../../models'
import Card from './Card/Card'
import Select, { SingleValue } from 'react-select'
import ModalEdit from './ModalEdit/ModalEdit'

const options: OptionType[] = [
    { value: 'downPrice', label: 'По убыванию цены' },
    { value: 'upPrice', label: 'По возрастанию цены' },
    { value: 'newerYear', label: 'По году: новее' },
    { value: 'olderYear', label: 'По году: старше' },
]

const Content = () => {

    const [cars, setCars] = useState<Car[]>([])
    const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editIdCar, setEditIdCar] = useState<number | null>(null)

    const fetchCars = async () => {
        const responce = await axios.get<Car[]>('https://test.tspb.su/test-task/vehicles')

        if (selectedOption?.value === 'downPrice') {
            responce.data.sort((a, b) => b.price - a.price)
        } else if (selectedOption?.value === 'upPrice') {
            responce.data.sort((a, b) => a.price - b.price)
        } else if (selectedOption?.value === 'newerYear') {
            responce.data.sort((a, b) => b.year - a.year)
        } else if (selectedOption?.value === 'olderYear') {
            responce.data.sort((a, b) => a.year - b.year)
        }
        setCars(responce.data)
    }

    const saveNewValues = (car: Car) => {
        setCars(cars => cars.map((carElement) =>
            carElement.id === car.id ? {
                ...carElement,
                name: car.name,
                model: car.model,
                price: car.price
            } : carElement
        ))
    }

    const closeModalWindow = () => {
        setEditIdCar(null)
        setIsEdit(false)
    }

    const setEditIdCarFunc = (id: number) => {
        setEditIdCar(id)
        setIsEdit(true)
    }

    const deleteCar = (id: number) => {
        let index;

        for (let i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                index = i;
                break;
            }
        }

        console.log('Индекс равен: ', index);
        
        if (index != undefined) {
            setCars([...cars.slice(0, index), ...cars.slice(index + 1)])
            setIsEdit(false)
            setEditIdCar(null)
        }
    }

    useEffect(() => {
        fetchCars()
    }, [selectedOption])

    let carProp;
    if (editIdCar) {
        const foundCar = cars.find(car => car.id === editIdCar);
        carProp = foundCar ? { ...foundCar } : undefined;
    }

    return (
        <div className={classes.container}>
            <div className={classes.settings}>
                <span>Сортировка</span>
                <Select<OptionType>
                    options={options}
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e)}
                    isClearable
                />
            </div>
            <div className={classes.cards}>
                {cars.map(car => <Card car={car} setEditIdCar={setEditIdCarFunc} setIsEdit={setIsEdit} key={car.id} />)}
            </div>
            {
                isEdit && <ModalEdit
                    deleteCar={deleteCar}
                    saveNewValues={saveNewValues}
                    car={carProp}
                    closeModalWindow={closeModalWindow} />
            }
        </div>
    )
}

export default Content