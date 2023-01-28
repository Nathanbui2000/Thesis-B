

function appointment ()
{
    const timeList = document.querySelector(".time-list");
const btnTimeList = document.querySelectorAll(".btn-time");
const checkBox = document.getElementById("opt-in");
console.log(checkBox);
const timeAdjustContainer = document.querySelector(".time-adjust-container");
// console.log(timeAdjustContainer);

// checkBox.addEventListener("change", function () {
//   if (checkBox.checked) {
//     timeAdjustContainer.classList.add("checked");
//     timeList.classList.add("checked");
//     for (const item of btnTimeList) {
//       item.setAttribute("aria-pressed", "false");
//     }
//   } else {
//     timeAdjustContainer.classList.remove("checked");
//     timeList.classList.remove("checked");
//   }
// });


    return (
        <>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A web page to book appointment" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Rubik:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        />
        <link href="css/appointment.css" rel="stylesheet" />
        <nav className="nav">
        <ul className="nav-list">
            <li>
            <a className="nav-item" href="index.html">
                Home
            </a>
            </li>
            <li>
            <a className="nav-item" href="#">
                Dashboard
            </a>
            </li>
            <li>
            <a className="nav-item" href="appointment.html">
                Appointment
            </a>
            </li>
            <li>
            <a className="nav-item" href="#">
                Verify Antique
            </a>
            </li>
            <li>
            <a className="nav-item" href="#">
                My Antique
            </a>
            </li>
            <li>
            <a className="nav-item" href="#">
                <i className="profile-icon ph-user-bold" />
            </a>
            </li>
        </ul>
        </nav>
        <main>
        <h1 className="heading-primary-appointment">Appointment Details</h1>
        <div className="calendar-container">
            <p>Select a Date</p>
            <p>Select a Time</p>
            <div id="calendar" role="application" aria-label="calendar" />
            <div className="time-container">
            <div className="time-slots">
                <ul className="time-list">
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    9:00AM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    10:00AM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    11:00AM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    12:00AM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    1:00PM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    2:00PM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    3:00PM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    4:00PM
                    </button>
                </li>
                <li>
                    <button className="btn-time" type="button" aria-pressed="false">
                    5:00PM
                    </button>
                </li>
                </ul>
            </div>
            <div className="time-manual">
                <div className="checkbox-container">
                <input type="checkbox" name="other-time-checkbox" id="opt-in" />
                <label htmlFor="opt-in">Other time?</label>
                </div>
                <div className="time-adjust-container">
                <input
                    type="number"
                    min={1}
                    max={12}
                    name="hour-input"
                    maxLength={2}
                    oninput="this.value=this.value.slice(0, this.maxLength)"
                />
                <svg viewBox="0 0 20 20" width="20px">
                    <circle cx={10} cy={3} r={3} />
                    <circle cx={10} cy={17} r={3} />
                </svg>
                <input
                    type="number"
                    min={1}
                    max={59}
                    name="minute-input"
                    maxLength={2}
                    oninput="this.value=this.value.slice(0,this.maxLength)"
                />
                <div className="am-pm-container">
                    <button className="btn-time" type="button" aria-pressed="false">
                    AM
                    </button>
                    <button className="btn-time" type="button" aria-pressed="false">
                    PM
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div>
            <button className="btn-appointment" type="button" aria-pressed="false">
            Get appointment
            </button>
        </div>
        </main>
        </>

    )
}
export default appointment;