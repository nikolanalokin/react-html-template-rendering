import { useCallback } from 'react'
import { renderTemplateToHTML, useExternalElementEventListener, useExternalPageRequest } from '../utils'
import { useNavigate } from 'react-router-dom'

const data = {
    logoSrc: './logo.png',
    product: {
        name: 'Хлеб ржаной',
        screenNumber: 1,
        primaryPrice: { main: 39, fraction: 99 },
        imageSrc: './product.jpg'
    }
}

export const Product = () => {
    const navigate = useNavigate()

    const { template, isExternal } = useExternalPageRequest('product')

    if (isExternal === null) return <div>Загрузка...</div>

    if (isExternal) {
        return <ExternalProduct template={template} />
    }

    return (
        <div>
            <div>Товар</div>
            <div>{ data.product.name }</div>
            <div>{ Object.keys(data.product.primaryPrice).map(key => data.product.primaryPrice[key]).join('.') } руб</div>
            <button onClick={() => navigate('/product')}>О товаре</button>
        </div>
    )
}

const ExternalProduct = (props) => {
    const { template } = props

    const navigate = useNavigate()

    const content = renderTemplateToHTML(template, data)

    const handleDetailsButtonClick = useCallback(() => {
        console.log('go to details!')
        navigate('/product/details')
    }, [])

    const handleRef = useExternalElementEventListener([
        {
            selector: '[data-id="DetailsButton"]',
            event: 'click',
            handler: handleDetailsButtonClick
        },
        {
            selector: '.product-image',
            event: 'click',
            handler: () => console.log('click to image')
        },
    ])

    return (
        <div ref={handleRef} className="ExternalPage" dangerouslySetInnerHTML={content} />
    )
}
