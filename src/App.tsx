import Calendar from "./components/Calendar";
import EventsProviders from "./context/Events";
function App() {
  return (
    <EventsProviders>
      <Calendar />
    </EventsProviders>
  );
}

export default App;
