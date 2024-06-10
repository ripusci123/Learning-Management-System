// export function slideInFromLeft(delay) {
//     return {
//         hidden: { x: -100, opacity: 0 },
//         visible: {
//             x: 0,
//             opacity: 1,
//             transition: {
//                 delay: delay,
//                 duration: 0.5,
//             },
//         },
//     };
// }

// export function slideInFromRight(delay) {
//     return {
//         hidden: { x: 100, opacity: 0 },
//         visible: {
//             x: 0,
//             opacity: 1,
//             transition: {
//                 delay: delay,
//                 duration: 0.5,
//             },
//         },
//     };
// }

// export const slideInFromTop = {
//     hidden: { y: -100, opacity: 0 },
//     visible: {
//         y: 0,
//         opacity: 1,
//         transition: {
//             delay: 0.5,
//             duration: 0.5,
//         },
//     },
// };
//delay-->kitne tym baad 
//duration--->kitne der tak chalega
export const fadeIn = (direction, delay,duration) => {
    return {
        hidden: {
            y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
            x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
            opacity : 0
        },
        show : {
            y : 0,
            x :0,
            opacity : 1,
            transition : {
                type : "tween",
                duration : duration,
                delay : delay,
                ease : [0.25,0.25,0.25,0.75]
            }
        }
    }
}