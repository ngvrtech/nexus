const DashboardDetails = ({ record, onClose }) => {
  if (!record) return null;
  const startDate = new Date(record.startTime).toLocaleDateString();
  record.checklistData.map((item) => console.log(item.name));
  console.log(record.checklistData);
  return (
    <div>
      <p>Start Date: {startDate}</p>
      <p>Submission Time: {record.submissionTime}</p>
      <p>Service: {record.service}</p>
      <p>Employee: {record.employee}</p>
      <p>Status: {record.status}</p>
      <p>Billable Hours: {record.billableHours}</p>
      <p>Reported Issues: {record.reportedIssues[0].type}</p>
      <p>
        Checklist:
        {record &&
          record.checklistData.map((item) => (
            <p key={item.name}>{item.name}</p>
          ))}
      </p>
      <p>Employee Comments: {record.employeeComments}</p>

      <button className="btn btn-secondary" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default DashboardDetails;
