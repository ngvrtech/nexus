import { useEffect, useState } from "react";

const DashboardDetails = ({ record, onClose }) => {
  if (!record) return null;

  const [printIssues, setPrintIssues] = useState("");
  const startDate = new Date(record.startTime).toLocaleDateString();
  const startTime = new Date(record.startTime).toLocaleTimeString();
  const submissionTime = new Date(record.submissionTime).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
  useEffect(() => {
    const reportedIssues = () => {
      let newText = "";
      if (record.reportedIssues[0].status === "true") {
        newText += `Missing items: ${record.reportedIssues[0].notes}`;
      }
      if (record.reportedIssues[1].status === "true") {
        newText += `Damaged items: ${record.reportedIssues[1].notes}\n`;
      }
      setPrintIssues(newText);
    };

    reportedIssues();
  }, []);
  // const reportedIssues = (issues) => {
  //   let newText = "";
  //   if (issues[0].status === "true") {
  //     newText += `Missing items: ${issues[0].notes}`;
  //   }
  //   if (issues[1].status === "true") {
  //     newText += `Damaged items: ${issues[1].notes}`;
  //   }
  //   return setPrintIssues(newText);
  // };
  // record.checklistData.map((item) => console.log(item.name));
  return (
    <div>
      <p>Start Date: {startDate}</p>
      <p>Submission Time: {submissionTime}</p>
      <p>Service: {record.service}</p>
      <p>Employee: {record.employee}</p>
      <p>Status: {record.status}</p>
      <p>Billable Hours: {record.billableHours}</p>
      <p>Reported Issues: {printIssues}</p>
      {/* <p>
        Checklist:
        {record &&
          record.checklistData.map((item) => (
            <p key={item.name}>{item.name}</p>
          ))}
      </p> */}
      <p>Employee Comments: {record.employeeComments}</p>
      <button className="btn btn-secondary mx-1">Edit</button>
      <button className="btn btn-secondary mx-1">Mark Inactive</button>

      <button className="btn btn-secondary mx-1" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default DashboardDetails;
