const { Expo } = require('expo-server-sdk');
const expo = new Expo();
async function PushNotifications(req,res) {
const { expoPushToken, title, message } = req.body;
console.log("expoTOken",expoPushToken);
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} no es válido`);
    return res.status(400).send('Token de Expo no válido');
  }

  const messages = [{
    to: expoPushToken,
    sound: 'default',
    title,
    body: message,
  }];

  try {
    const receipts = await expo.sendPushNotificationsAsync(messages);
    console.log(receipts);
    res.status(200).send('Notificación enviada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar notificación');
  }
}
module.exports={
    PushNotifications
}