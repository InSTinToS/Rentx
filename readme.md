# Autenticação com token JWT

---

## Objetivo

- Enviar informações entre terceiros proibindo alterações mas permitindo visualização.

- Para se manter autenticado após o login, o token garante quem é o usuário (se o token não for repassado para outra pessoa).

---

## Encode vs Encrypt

- Encode (Codificar): Transformar um valor em um código afim de ser descodificado (decode) por outro meio.

- Encrypt (Criptografar): Transformar um valor em um código que só pode ser descriptografado (decrypt) se possuir uma chave de descriptografia (secret);

---

## Como funciona

- O JWT é composto por Header (Encode), Payload (Encode) e Signature mistura do header, payload e secret criptografados (Encrypt).

- Como o Header e o Payload são codificados eles podem ser descodificados por qualquer meio mesmo sem utilizar o secret.

- Então para que serve o secret? Ao receber o token jwt afim de valida-lo é preciso criar um novo signature com o header e payload recebidos mais o secret armazenado internamente, se o novo signature for igual ao recebido então o token é válido.

- As informações do jwt PODEM ser vistas mas NÃO PODEM ser alteradas sem o SECRET (podem ser alteradas mas resultará em um error no servidor) se um token for recebido com o subject 123 e o usuário alterar para 321 sem utilizar o secret o código será diferente.

---

## Criar usuário com senha criptografada

POST - '/user' req.body = { email, password }

- 1: Verificar se e-mail ja não existe

- 2: Criar senha criptografada baseada na senha recebida

  - 2.1: Usando bcrypt
    `const encryptedPassword = await hash(password, salt)`

- 3: Criar usuário com a senha criptografada e o resto dos dados e enviar ao banco.

---

## Verificar senha criptografada (Fazer login) & Assinar/Criar token JWT

POST -> '/sessions' req.body = { email, password }

- 1: Encontrar usuário pelo email.

- 2: Comparar senha do usuário com a senha criptografada criada na criação de usuário.

  - 2.1: usando bcrypt com password sendo a senha recebida na req.body e user.password a senha do usuário armazenado no banco.
    `const passwordIsValid = await compare(password, user.password)`

- 3: Criar JWT

  - 3.1: usando jsonwebtoken com secret armazenado em um lugar seguro (.env).
    `const token = sign({}, auth.token.secret, { subject: user.id, expiresIn: auth.token.expires_in })`

- 4: Retornar o token

---

## Autorização a uma rota

- 1: Em request.headers.authorization enviar o \`Bearer token\` onde token é o token jwt recebido na autenticação.

- 2: Verificar se o token é válido

- 3: Prosseguir

---
