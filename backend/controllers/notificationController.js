// import sendNotification from '../firebase/sendNotification.js' // Ensure this path is correct

// const sendNotif = async (req, res) => {
//   const { fcmToken, title, body } = req.body
//   // console.log(fcmToken, title, body)

//   try {
//     await sendNotification(fcmToken, title, body)
//     res.status(200).json({ message: 'Notification sent successfully' })
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Error sending notification', error: error.message })
//   }
// }

// export { sendNotif }
