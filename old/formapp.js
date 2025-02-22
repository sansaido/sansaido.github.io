function createFormSubmitTrigger() {
  const form = FormApp.getActiveForm()

  const currentTriggers = ScriptApp.getProjectTriggers()
  if(currentTriggers.length > 0) {
    return
  }

  ScriptApp.newTrigger('onFormSubmit')
  .forForm(form)
  .onFormSubmit()
  .create()
}

//When a trigger fires, Apps Script passes the function an event object as an argument, typically called e. The event object contains information about the context that caused the trigger to fire. 
function onFormSubmit(e) {

  // e.response returns a FormResponse object
  // https://developers.google.com/apps-script/reference/forms/form-response
  const formResponse = e.response
  // returns ItemResponse[]
  // https://developers.google.com/apps-script/reference/forms/item-response
  const itemResponses = formResponse.getItemResponses()

  const emailBody = []

  for(const itemResponse of itemResponses) {
    // returns string
    const title = itemResponse.getItem().getTitle()
    // returns Object — a String or String[] or String[][] of answers to the question item
    const answer = itemResponse.getResponse()

    const entry = `【${title}】\r\n${answer}\r\n`
    emailBody.push(entry)
  }

  // const timeStamp = formResponse.getTimestamp()
  sendEmail(emailBody.join("\r\n"))
  
}

function sendEmail(body) {
  const emailUser = Session.getActiveUser().getEmail()
  const toAddress = 'sansaido@h.do-up.com'
  // const toAddress = 'tsuruiyumi@yahoo.co.jp'
  const subject = "学校園関係者より回答が来ました"
  
  if(!emailUser) {
    Logger.log('Error: no email user found')
    return
  }
  GmailApp.sendEmail(
    toAddress,
    subject,
    body,
  )
}

// getFormData(customerForm)
// function getFormData(form) {
//   // const formId = "1pBIbFJw9KyaSTdDxuFsV8cNcsodKxeuAevMcAlyulwM"
//   // const sansaidoForm = FormApp.openById(formId)
  
//   const customerForm = FormApp.getActiveForm()
//   if(!customerForm) {
//     Logger.log("Error: no form found")
//   }

  
//   const formResponses = customerForm.getResponses()  
//   for(const formResponse of formResponses) {    

//     const itemReponses = formResponse.getItemResponses()        
//       for (const itemResponse of itemReponses) {      
//       Logger.log(`${itemResponse.getItem().getTitle()}: ${itemResponse.getResponse()}`)
//     }
//   }




// }
//   // for (let i = 0; i < formResponses.length; i++) {
//   //   const formResponse = formResponses[i]
//   //   const itemResponses = formResponse.getItemResponses()
//   //   for (const itemResponse of itemResponses) {
//   //     Logger.log(
//   //       `Question: ${itemResponse.getItem().getTitle()}`,
//   //       `Answer: ${itemResponse.getResponse()}`
//   //     )
//   //   }
//     // for (let j = 0; j < itemResponses.length; j++) {
//     //   const itemResponse = itemResponses[j]
//     //   Logger.log(
//     //     itemResponse.getItem().getTitle(),
//     //     itemResponse.getResponse()
//     //     // (i + 1).toString,
//     //     // itemResponse.getItem().getTitle(),
//     //     // itemResponse.getResponse()
//     //   )
//     // }

//   // }
