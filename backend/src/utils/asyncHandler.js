// const asyncHandler = (fn) =>{
//     return (req,res,next)=>{
//         Promise.resolve(fn(req, res, next)).catch((err)=> next(err))
//     }
// }

// const asyncHandler = (fn) =>{
//     return async (req,res,next)=>{
//         try {
//             await fn(req,res,next)
//         } catch (error) {
//             res.status(error.code).json({
//                 success : false,
//                 message : error.message
//             })
//         }
//     }
// }

// export {asyncHandler}


const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            let statusCode = 500; // Default status code for internal server error
            if (error instanceof Error && error.status) {
                statusCode = error.status;
            }
            res.status(statusCode).json({
                success: false,
                message: error.message || 'Internal Server Error'
            });
        }
    };
};

export { asyncHandler };
