
import { useTicket } from "../context/TicketContext";

function TicketSummary() {
    const { tickets } = useTicket();

    const total = tickets.length;

    const open = tickets.filter(
        (ticket) => ticket.status === "Open"
    ).length;

    const progress = tickets.filter(
        (ticket) => ticket.status === "In Progress"
    ).length;

    const resolved = tickets.filter(
        (ticket) => ticket.status === "Resolved"
    ).length;

    const hardware = tickets.filter(
        (ticket) => ticket.category === "Hardware"
    ).length;

    const software = tickets.filter(
        (ticket) => ticket.category === "Software"
    ).length;

    const network = tickets.filter(
        (ticket) => ticket.category === "Network"
    ).length;

    const account = tickets.filter(
        (ticket) => ticket.category === "Account"
    ).length;

     const security = tickets.filter(
        (ticket) => ticket.category === "Security"
    ).length;

    return (
        <div className="row g-3 mb-4">
            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Total Ticket</h6>
                        <h2>{total}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Open</h6>
                        <h2>{open}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">In Progress</h6>
                        <h2>{progress}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Resolved</h6>
                        <h2>{resolved}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Hardware</h6>
                        <h2>{hardware}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Software</h6>
                        <h2>{software}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Network</h6>
                        <h2>{network}</h2>
                    </div>
                </div>
            </div>


            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Account</h6>
                        <h2>{account}</h2>
                    </div>
                </div>
            </div>
            
            <div className="col-md-3">
                <div className="card shadow-sm text-center">
                    <div className="card-body">
                        <h6 className="text-muted">Security</h6>
                        <h2>{security}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketSummary;
