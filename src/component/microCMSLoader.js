export default function microCMSLoader({src,width,quality}){
    return `${src}?auto=format&fit=max&w=${width}`
}