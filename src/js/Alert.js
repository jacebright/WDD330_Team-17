const path = '../json/alerts.json';

export default class Alert {

    static async renderAlerts() {

        //fetch alert data from alerts.json
        const response = await fetch(path);

        //Check that response is valid
        if (!response.ok)
            throw new Error("Bad Response");

        //Get the list of alerts from the response
        const alerts = await response.json();

        //Check if there is anything in the list of alerts
        if (alerts.length < 1)
            return;

        //Create the alert-list section
        const section = document.createElement("section");
        section.classList.add("alert-list");


        alerts.forEach((alert) => {
            //Create <p> element for each alert
            const message = document.createElement("p");
            message.innerText = alert.message;

            //Style the element
            message.style.backgroundColor = alert.background;
            message.style.color = alert.color;

            //Add message to alert list
            section.appendChild(message);
        })

        //Prepend alert list to main element
        document.querySelector('main').prepend(section);
    }

}