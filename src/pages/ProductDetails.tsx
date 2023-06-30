import { useNavigate } from 'react-router-dom'

export const ProductDetails = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div>Информация о товаре</div>
            <button onClick={() => navigate('/product')}>Назад</button>
        </div>
    )
}
