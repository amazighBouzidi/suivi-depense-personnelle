import * as yup from 'yup';

const validationSchemaProfile = yup.object({
    lastName: yup
      .string('Entrez votre nom')
      .required('Le nom est requis'),
    firstName: yup
      .string('Entrez votre prénom')
      .required('Le prénom est requis'),
    address: yup
      .string('Entrez votre adresse')
      .required('L\'adresse est requise'),
    email: yup
      .string('Entrez votre adresse email')
      .email('Entrez une adresse email valide')
      .required('L\'adresse email est requise'),
});
  
export default validationSchemaProfile;