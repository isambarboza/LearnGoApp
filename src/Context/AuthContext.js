import { createContext, useState } from "react";
import TelaCadastro from "../Pages/TelaCadastro";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [logado, setLogado] = useState(true);
    const [error, setError] = useState(false);
    const [cadastro, setCadastro ] = useState( false );
    const [ user, setUser ] = useState();


    async function Login(email, senha) {

        if (email != "" && senha != "") {
            await fetch( "http://10.139.75.63:5251/api/Cadastro/Login", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    cadastroEmail: email,
                    CadastroSenha: senha
                })
            })
                .then(res => res.json() )
                .then(json => {
                    setLogado((json.cadastroId) ? true : false);
                    setError((json.cadastroId) ? false : true);
                    setUser( json );
                }
                )
                .catch(err => setError(true))
        } else {
            setError(true)
        }
    }

    return (
        <AuthContext.Provider value={{ logado: logado, Login, error: error, cadastro: cadastro, setCadastro: setCadastro, user: user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;