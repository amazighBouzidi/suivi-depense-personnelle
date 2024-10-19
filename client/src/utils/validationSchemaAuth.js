import * as yup from 'yup';

const validationSchemaAuth = yup.object({
    email: yup
      .string("Entrez votre nom d'utilisateur")
      .required("Le nom d'utilisateur est obligatoire"),
    password: yup
      .string('Entrez votre mot de passe')
      .required('Le mot de passe est requis'),    
});
  
export default validationSchemaAuth;