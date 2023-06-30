import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom'
import { renderTemplateToHTML, useExternalElementEventListener, useExternalPageRequest } from '../utils'
import { useCallback } from 'react'

export const Main = () => {
    const navigate = useNavigate()

    const { template, isExternal } = useExternalPageRequest('main')

    if (isExternal === null) return <div>Загрузка...</div>

    if (isExternal) {
        return <ExternalMain template={template} />
    }

    return (
        <div>
            <div>Отсканируйте товар</div>
            <button onClick={() => navigate('/product')}>Отсканировать</button>
        </div>
    )
}

const ExternalMain = (props) => {
    const navigate = useNavigate()

    const { template } = props

    const content = renderTemplateToHTML(template)

    const handleButtonClick = useCallback(() => {
        navigate('/product')
    }, [])

    const handleRef = useExternalElementEventListener([
        {
            selector: '[data-id="ScanButton"]',
            event: 'click',
            handler: handleButtonClick
        },
    ])

    return (
        <div ref={handleRef} className="ExternalPage" dangerouslySetInnerHTML={content} />
    )
}
