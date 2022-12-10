// import { state } from '../data/state'
// import { nodes } from '../data/nodes'

// export const getCoordinatesOnWindow = (event, scale) => {
//     if (event.pageX || event.pageY) {
//         return [
//             Math.floor(event.pageX / scale),
//             Math.floor(event.pageY / scale),
//         ]
//     } if (event.touches) {
//         return [
//             Math.floor(event.touches[0].pageX / scale),
//             Math.floor(event.touches[0].pageY / scale),
//         ]
//     }

//     return [0, 0]
// }
export const getCoordinates = (event: any, scale = 1, htmlScale = 1): [number, number] => {
    // const { parentNode }: {
    //     parentNode:
    //      { scrollLeft: number,
    //     scrollTop: number }
    //  } = nodes.canvasRoot

    if (event.pageX || event.pageY) {
        // console.log(event.pageX, event.pageY)

        return [
            Math.floor(1 / htmlScale + event.pageX / scale),
            Math.floor(1 / htmlScale + event.pageY / scale),
        ]
    } if (event.touches) {
        return [
            Math.floor(1 / htmlScale + event.touches[0].pageX / scale),
            Math.floor(1 / htmlScale + event.touches[0].pageY / scale),
        ]
    }

    return [0, 0]
}
