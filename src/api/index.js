// const COHORT_NAME = '2209-FTB-ET-WEB-AM'

// export const createPost = async ({
//     token, 
//     title, 
//     description, 
//     price, 
//     willDeliver,
// }) => {
//     try{
//         const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`, 
//         {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 post: {
//                     title: title,
//                     description: description,
//                     price: price,
//                     willDeliver: willDeliver,
//                 },
//             }),
//         });
//         const result = await response.json();
//         console.log(response)
//         console.log(result)
//     } catch (error){
//         console.log(error);
//     }
// };