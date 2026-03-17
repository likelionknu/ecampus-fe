import SessionInfo from "./SessionsInfo";
import SessionOverview from "./SessionsOverview";

function SessionInfoOverview() {
  return (
    <section className="flex gap-7.5">
      <SessionInfo />
      <SessionOverview />
    </section>
  );
}

export default SessionInfoOverview;
