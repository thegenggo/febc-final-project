export type VideoJsOptions = {
    autoplay?: boolean,
    controls?: boolean,
    responsive?: boolean,
    fluid?: boolean,
    sources: Source[]
}

export type Source = {
    src?: string,
    type?: 'video/mp4',
}