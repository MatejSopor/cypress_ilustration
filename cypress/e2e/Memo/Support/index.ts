declare namespace Cypress {
  interface Chainable {
    /**
     * @description Open the new appointment form from the header
     */
    createNewAppointment(): void;
    /**
     * @description 1st step - Fillout the forms of the new appointment and click continue
     */
    fillOutAppointmentForm(): void;
    /**
     * @description 2st step - Selecting recipients of the new appointment and clic continue
     */
    selectRecipients(): void;
    /**
     * @description 3rd step - Sending details to calendar and creating appointment
     */
    confirmOperation(): void;

    /**
     * @description Pressing All button and checkign if there is only one appointment created in the list
     */
    checkIfAppointmentWasCreated(): void;
    /**
     * @description Visualize the appointment and see if the same settings that was selected are also shown to the user
     */
    visualizeTheAppointment(): void;
    /**
     * @description Delete appointment
     */
    deleteTheAppointment(): void;
    /**
     * @description Pressing All button and checkign that there should not be any appointment in the list
     */

    checkIfTheAppointmentWasDeleted(): void;
    fillOutAppointmentFormForPortfolio(): void;
    /**
     * @description 1st step - Fillout the forms of the new appointment from company selected form portfolio and click continue
     */
    editAppointment(): void;
    /**
     * @description Editing the appointment and saving it
     */
  }
}
