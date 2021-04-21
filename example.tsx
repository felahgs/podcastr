type User = {
  name: string;
  address: {
    city: string;
    state: string;
  }
}

// Retornar o texto de boas-vindas do site
function createWelcomeMessage(user: User) {
  return `Boas-vindas, ${user.name}. Cidade: ${user.address.city} - ${user.address.state}!`
}

const welcomeMessage = createWelcomeMessage({
  name: 'Felipe Souza',
  address: {
    city: 'Curitiba',
    state: 'PR'
  }
});

// Tipagem ds propriedades

type ButtonProps = {
  title: string;
}

function Button(props: ButtonProps) {
  return(
    <button>{props.title}</button>
)};

function App() {
  return (
    <div>
      <Button title="Button 1"></Button>
      <Button title="Button 2"></Button>
      <Button title="Button 3"></Button>
    </div>
  )
}
