import { TasksProvider } from "@/context/taskContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <TasksProvider>
      <Component {...pageProps} />
    </TasksProvider>
  );
}
