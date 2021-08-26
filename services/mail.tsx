import emailjs from 'emailjs-com';


export default async function sendEmail(values) {

    const templateParams = {
        name: values.name + ' ' + values.firstName,
        notes: values
    };
    let templateID;
    switch(values.alertType){
        case("Accident de la route"):templateID = "template_afo2r6r"
        break;
        case("Travaux"):templateID = "template_afo2r6r"
        break;
        case("Problème de voirie"):templateID = "template_afo2r6r"
        break;
        case("Animal perdu"):templateID = "template_afo2r6r"
        break;
        default:templateID = "template_afo2r6r"
        break;
    }
    const mailStatus = await emailjs.send('service_7k02pyu', templateID, templateParams, 'user_rmkjPQeQcwQ3PBlW2bRTR')
        .then((result) => {
            return result.text;
        }, (error) => {
            return error.text;
        });
    return mailStatus;
}