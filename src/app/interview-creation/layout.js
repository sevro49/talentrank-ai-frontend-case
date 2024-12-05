import FormControls from "../../components/FormControls";
import Header from "../../components/Header";

export default function InterviewCreationLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <FormControls />
    </div>
  );
}
