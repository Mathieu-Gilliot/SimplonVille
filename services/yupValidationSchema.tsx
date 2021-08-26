import * as yup from 'yup';


export const alertValidationSchema = yup.object().shape({
    alertType: yup.string().required('La cause doit être renseignée'),
    alertDescription: yup.string().required('Veuillez décrire l\'incident'),
    alertDate: yup.string().required('Veuillez renseigner la date de l\'incident'),
    alertHour: yup.string().required('Veuillez renseigner l\'heure de l\'incident'),
    alertLocation: yup.string().required('Veuillez renseigner l\'adresse où s\'est produit l`\'incident'),
    alertPicture: yup.object(),
    name: yup.string().required('Veuillez renseigner votre nom'),
    firstName: yup.string().required('Veuillez renseigner votre prénom'),
    adress: yup.string().required('Veuillez renseigner votre adresse'),
    zipCode: yup.string().required('Veuillez renseigner votre code postal'),
    town: yup.string().required('Veuillez renseigner votre commune'),
    phoneNumber: yup.string(),
    email: yup.string().email('Ceci n\'est pas une adresse mail').required('Veuillez renseigner votre adresse mail'),
})