import * as Sqrl from 'squirrelly'
import DOMPurify from 'dompurify'
import { useEffect, useRef, useState } from 'react'

export const renderTemplateToHTML = (template: string, data: object = {}) => {
    // const engineTemplate = Handlebars.compile(template)
    // const html = engineTemplate(data)

    const html = Sqrl.render(template, data)

    console.log('html', html)

    const sanitizedHtml = DOMPurify.sanitize(html)

    console.log('sanitizedHtml', sanitizedHtml)

    return { __html: sanitizedHtml }
}

interface NodeListenerParams {
    selector: string
    event: string
    handler: () => void
}

export function useExternalElementEventListener<T extends Element>(declarations: NodeListenerParams[]) {
    const rootRef = useRef<T>(null)
    const elementsRef = useRef<any>({})

    const addHandler = (params: NodeListenerParams) => {
        elementsRef.current[params.selector] = rootRef.current.querySelector<HTMLButtonElement>(params.selector)
        elementsRef.current[params.selector]?.addEventListener(params.event, params.handler)
    }

    const removeHandler = (params: NodeListenerParams) => {
        elementsRef.current[params.selector]?.removeEventListener(params.event, params.handler)
        elementsRef.current[params.selector] = null
    }

    return (rootEl: T) => {
        rootRef.current = rootEl
        if (rootEl) {
            declarations.forEach(addHandler)
        } else {
            declarations.forEach(removeHandler)
        }
    }
}

export function useExternalPageRequest (page: string) {

    const [template, setTemplate] = useState<string>(null)
    const [isExternal, setIsExternal] = useState<boolean>(null)

    useEffect(() => {
        const request = async () => {
            try {
                const res = await fetch(`./${page}.sqrl`)
                if (res.status !== 200) throw new Error()
                const data = await res.text()
                setTemplate(data)
                setIsExternal(true)
            } catch (err) {
                console.warn(`Client template for ${page} not found!`)
                setIsExternal(false)
            }
        }

        request()
    }, [])

    return {
        template,
        isExternal,
    }
}
