import type { Lang } from "@/context/LanguageContext";

export type Translations = {
  common: {
    kioskTitle: string;
    back: string;
    home: string;
    skip: string;
    next: string;
    submit: string;
    verify: string;
    verifyContinue: string;
    sendOtp: string;
    otpSentTo: string;
    otpSentRegistered: string;
    backToHome: string;
    printReceipt: string;
    sendSms: string;
      sendingReceiptSms: string;
      receiptSmsSent: string;
    printingReceipt: string;
    receiptPrinted: string;
      printingStatus: string;
      statusPrinted: string;
    printStatus: string;
    callNow: string;
    helpline: string;
    listen: string;
    stopListening: string;
    speechUnavailable: string;
    languageNames: Record<Lang, string>;
    textSize: {
      heading: string;
      helper: string;
      default: string;
      increase: string;
      decrease: string;
    };
  };
  index: {
    instruction: string;
    services: {
      payBill: string;
      registerComplaint: string;
      trackStatus: string;
      applyService: string;
      help: string;
    };
  };
  payBill: {
    title: string;
    departments: { electricity: string; gas: string; water: string };
    selectDepartment: string;
    chooseInputMethod: string;
    inputMethods: {
      consumer: { label: string; placeholder: string; heading: string };
      mobile: { label: string; placeholder: string; heading: string };
    };
    submitInput: string;
    billDetails: {
      heading: string;
      consumerName: string;
      department: string;
      amountDue: string;
      dueDate: string;
      proceed: string;
    };
    paymentMethod: {
      heading: string;
      methods: { upi: string; debit: string; netbanking: string };
    };
    success: {
      heading: string;
        receiptHeading: string;
        consumerId: string;
        name: string;
        mobile: string;
        billFor: string;
      transactionId: string;
      amountPaid: string;
    };
    otp: {
      heading: string;
      placeholder: string;
    };
  };
  registerComplaint: {
    title: string;
    departments: { electricity: string; gas: string; water: string; waste: string };
    selectDepartment: string;
    verifyIdentity: string;
    authMethods: { mobile: string; consumer: string };
    enterMobile: string;
    enterConsumer: string;
    enterOtp: string;
    otpPlaceholder: string;
    complaintType: string;
    complaintTypes: {
      no_supply: string;
      billing: string;
      leakage: string;
      delay: string;
      other: string;
    };
    descriptionHeading: string;
    descriptionPlaceholder: string;
    successHeading: string;
    complaintNumber: string;
    department: string;
    resolution: string;
    resolutionEta: string;
    buttons: { submit: string; skip: string; next: string };
  };
  trackStatus: {
    title: string;
    selectType: string;
    trackTypes: { complaint: string; service: string; payment: string };
    enterId: string;
    idPlaceholder: string;
    trackButton: string;
    statusHeading: string;
    steps: [string, string, string, string];
    labels: {
      trackingId: string;
      status: string;
      lastUpdated: string;
      department: string;
      officer: string;
    };
    statusValue: string;
  };
  applyService: {
    title: string;
    selectService: string;
    services: { electricity: string; gas: string; water: string };
    otpStepHeading: string;
    mobilePlaceholder: string;
    otpPlaceholder: string;
    subSteps: [string, string, string];
    personalHeading: string;
    namePlaceholder: string;
    aadhaarPlaceholder: string;
    addressHeading: string;
    addressPlaceholder: string;
    cityPlaceholder: string;
    pincodePlaceholder: string;
    reviewHeading: string;
    reviewLabels: { service: string; name: string; address: string; city: string };
    submitApplication: string;
    successHeading: string;
    applicationId: string;
    processing: string;
  };
  help: {
    title: string;
    topics: {
      pay: string;
      complaint: string;
      track: string;
      support: string;
      faq: string;
    };
    content: Record<string, string>;
    audioOn: string;
    audioOff: string;
  };
  notFound: {
    message: string;
    cta: string;
  };
};

export const translations: Record<Lang, Translations> = {
  en: {
    common: {
      kioskTitle: "Citizen Utility Service Kiosk",
      back: "Back",
      home: "Home",
      skip: "Skip",
      next: "Next",
      submit: "Submit",
      verify: "Verify",
      verifyContinue: "Verify & Continue",
      sendOtp: "Send OTP",
      otpSentTo: "OTP sent to mobile",
      otpSentRegistered: "OTP sent to registered mobile",
      backToHome: "Back to Home",
      printReceipt: "Print Receipt",
      sendSms: "Send SMS",
      sendingReceiptSms: "Sending Receipt SMS",
      receiptSmsSent: "Receipt SMS Sent",
      printingReceipt: "Printing Receipt",
      receiptPrinted: "Receipt Printed, collect it from slot",
      printingStatus: "Printing Status",
      statusPrinted: "Status printed, collect it from slot",
      printStatus: "Print Status",
      callNow: "Call Now",
      helpline: "Helpline: 1800-XXX-XXXX (Toll Free, 24/7)",
      listen: "Listen to this screen",
      stopListening: "Stop audio",
      speechUnavailable: "Speech not supported on this device",
      languageNames: { en: "English", hi: "हिन्दी", mr: "मराठी" },
      textSize: {
        heading: "Text accessibility",
        helper: "Adjust kiosk font size",
        default: "Default size",
        increase: "Increase size",
        decrease: "Decrease size",
      },
    },
    index: {
      instruction: "Touch a service to begin",
      services: {
        payBill: "Pay Bill",
        registerComplaint: "Register Complaint",
        trackStatus: "Track Status",
        applyService: "Apply for Service",
        help: "Help",
      },
    },
    payBill: {
      title: "Pay Bill",
      departments: { electricity: "Electricity", gas: "Gas", water: "Water" },
      selectDepartment: "Select Department",
      chooseInputMethod: "Choose Input Method",
      inputMethods: {
        consumer: { label: "Enter Consumer ID", placeholder: "e.g. 123456789", heading: "Enter Consumer ID" },
        mobile: { label: "Enter Mobile Number", placeholder: "e.g. 9876543210", heading: "Enter Mobile Number" },
      },
      submitInput: "Submit",
      billDetails: {
        heading: "Bill Details",
        consumerName: "Consumer Name",
        department: "Department",
        amountDue: "Amount Due",
        dueDate: "Due Date",
        proceed: "Proceed to Pay",
      },
      paymentMethod: {
        heading: "Select Payment Method",
        methods: { upi: "UPI", debit: "Debit Card", netbanking: "Net Banking" },
      },
      success: {
        heading: "Payment Successful!",
        receiptHeading: "Receipt",
        consumerId: "Consumer ID",
        name: "Name",
        mobile: "Mobile",
        billFor: "Department",
        transactionId: "Transaction ID",
        amountPaid: "Amount Paid",
      },
      otp: {
        heading: "Enter OTP",
        placeholder: "Enter 6-digit OTP",
      },
    },
    registerComplaint: {
      title: "Register Complaint",
      departments: { electricity: "Electricity", gas: "Gas", water: "Water", waste: "Waste Management" },
      selectDepartment: "Select Department",
      verifyIdentity: "Verify Your Identity",
      authMethods: { mobile: "Mobile OTP", consumer: "Consumer ID + OTP" },
      enterMobile: "Enter Mobile Number",
      enterConsumer: "Enter Consumer ID",
      enterOtp: "Enter OTP",
      otpPlaceholder: "Enter 6-digit OTP",
      complaintType: "Select Complaint Type",
      complaintTypes: {
        no_supply: "No Supply",
        billing: "Billing Issue",
        leakage: "Leakage",
        delay: "Service Delay",
        other: "Other",
      },
      descriptionHeading: "Describe Your Issue (Optional)",
      descriptionPlaceholder: "Type your complaint details here...",
      successHeading: "Complaint Registered!",
      complaintNumber: "Complaint No.",
      department: "Department",
      resolution: "Est. Resolution",
      resolutionEta: "3-5 Working Days",
      buttons: { submit: "Submit", skip: "Skip", next: "Next" },
    },
    trackStatus: {
      title: "Track Status",
      selectType: "What would you like to track?",
      trackTypes: {
        complaint: "Complaint Status",
        service: "Service Application",
        payment: "Payment Status",
      },
      enterId: "Enter Tracking ID or Mobile Number",
      idPlaceholder: "e.g. CMP-2026-00482",
      trackButton: "Track",
      statusHeading: "Status Details",
      steps: ["Submitted", "Under Review", "In Progress", "Resolved"],
      labels: {
        trackingId: "Tracking ID",
        status: "Status",
        lastUpdated: "Last Updated",
        department: "Department",
        officer: "Assigned Officer",
      },
      statusValue: "In Progress",
    },
    applyService: {
      title: "Apply for Service",
      selectService: "Select Service",
      services: {
        electricity: "New Electricity Connection",
        gas: "New Gas Connection",
        water: "New Water Connection",
      },
      otpStepHeading: "Verify via Mobile OTP",
      mobilePlaceholder: "Mobile Number",
      otpPlaceholder: "Enter OTP",
      subSteps: ["Personal Details", "Address Details", "Review & Submit"],
      personalHeading: "Personal Details",
      namePlaceholder: "Full Name",
      aadhaarPlaceholder: "Aadhaar Number",
      addressHeading: "Address Details",
      addressPlaceholder: "Full Address",
      cityPlaceholder: "City",
      pincodePlaceholder: "PIN Code",
      reviewHeading: "Review & Submit",
      reviewLabels: { service: "Service", name: "Name", address: "Address", city: "City" },
      submitApplication: "Submit Application",
      successHeading: "Application Submitted!",
      applicationId: "Application ID",
      processing: "Est. Processing",
    },
    help: {
      title: "Help & Assistance",
      topics: {
        pay: "How to Pay Bill",
        complaint: "How to Register Complaint",
        track: "How to Track Status",
        support: "Speak to Support",
        faq: "FAQs",
      },
      content: {
        pay: "1. Tap 'Pay Bill' on the home screen.\n2. Select your department (Electricity, Gas, Water).\n3. Enter your Consumer ID, scan QR, or enter mobile number.\n4. Review the bill details.\n5. Choose a payment method and complete payment.\n6. Collect your receipt.",
        complaint: "1. Tap 'Register Complaint'.\n2. Select department.\n3. Verify identity via OTP.\n4. Choose complaint type.\n5. Add description (optional).\n6. Get your complaint number.",
        track: "1. Tap 'Track Status'.\n2. Select what to track.\n3. Enter your tracking ID.\n4. View real-time status.",
        support: "For immediate assistance, please call our helpline:\n\n📞 1800-XXX-XXXX (Toll Free)\n\nAvailable 24/7",
        faq: "Q: What documents do I need?\nA: Aadhaar Card and Address Proof.\n\nQ: How long does service take?\nA: 7-10 working days.\n\nQ: Can I pay with cash?\nA: No, only digital payments accepted.",
      },
      audioOn: "Audio On",
      audioOff: "Audio Off",
    },
    notFound: {
      message: "Oops! Page not found",
      cta: "Return to Home",
    },
  },
  hi: {
    common: {
      kioskTitle: "नागरिक उपयोगिता सेवा कियोस्क",
      back: "वापस",
      home: "होम",
      skip: "स्किप",
      next: "आगे",
      submit: "जमा करें",
      verify: "सत्यापित करें",
      verifyContinue: "सत्यापित करें और आगे बढ़ें",
      sendOtp: "ओटीपी भेजें",
      otpSentTo: "मोबाइल पर ओटीपी भेजा गया",
      otpSentRegistered: "पंजीकृत मोबाइल पर ओटीपी भेजा गया",
      backToHome: "होम पर लौटें",
      printReceipt: "रसीद प्रिंट करें",
      sendSms: "एसएमएस भेजें",
      sendingReceiptSms: "रसीद एसएमएस भेजा जा रहा है",
      receiptSmsSent: "रसीद एसएमएस भेज दिया गया",
      printingReceipt: "रसीद प्रिंट हो रही है",
      receiptPrinted: "रसीद प्रिंट हो गई, स्लॉट से प्राप्त करें",
      printingStatus: "स्टेटस प्रिंट हो रहा है",
      statusPrinted: "स्टेटस प्रिंट हो गया, स्लॉट से प्राप्त करें",
      printStatus: "स्थिति प्रिंट करें",
      callNow: "अभी कॉल करें",
      helpline: "हेल्पलाइन: 1800-XXX-XXXX (टोल फ्री, 24/7)",
      listen: "यह स्क्रीन सुनें",
      stopListening: "ऑडियो रोकें",
      speechUnavailable: "इस उपकरण पर वाणी उपलब्ध नहीं है",
      languageNames: { en: "English", hi: "हिन्दी", mr: "मराठी" },
      textSize: {
        heading: "पाठ पहुंच",
        helper: "यहाँ फ़ॉन्ट आकार बदलें",
        default: "सामान्य आकार",
        increase: "बड़ा करें",
        decrease: "छोटा करें",
      },
    },
    index: {
      instruction: "शुरू करने के लिए सेवा स्पर्श करें",
      services: {
        payBill: "बिल भुगतान",
        registerComplaint: "शिकायत दर्ज करें",
        trackStatus: "स्थिति ट्रैक करें",
        applyService: "सेवा के लिए आवेदन",
        help: "सहायता",
      },
    },
    payBill: {
      title: "बिल भुगतान",
      departments: { electricity: "बिजली", gas: "गैस", water: "पानी" },
      selectDepartment: "विभाग चुनें",
      chooseInputMethod: "इनपुट विधि चुनें",
      inputMethods: {
        consumer: { label: "उपभोक्ता आईडी दर्ज करें", placeholder: "उदा. 123456789", heading: "उपभोक्ता आईडी दर्ज करें" },
        mobile: { label: "मोबाइल नंबर दर्ज करें", placeholder: "उदा. 9876543210", heading: "मोबाइल नंबर दर्ज करें" },
      },
      submitInput: "सबमिट",
      billDetails: {
        heading: "बिल विवरण",
        consumerName: "उपभोक्ता नाम",
        department: "विभाग",
        amountDue: "बकाया राशि",
        dueDate: "नियत तिथि",
        proceed: "भुगतान जारी रखें",
      },
      paymentMethod: {
        heading: "भुगतान विधि चुनें",
        methods: { upi: "यूपीआई", debit: "डेबिट कार्ड", netbanking: "नेट बैंकिंग" },
      },
      success: {
        heading: "भुगतान सफल!",
        receiptHeading: "रसीद",
        consumerId: "उपभोक्ता आईडी",
        name: "नाम",
        mobile: "मोबाइल",
        billFor: "विभाग",
        transactionId: "लेनदेन आईडी",
        amountPaid: "भुगतान राशि",
      },
      otp: {
        heading: "ओटीपी दर्ज करें",
        placeholder: "6 अंकों का ओटीपी दर्ज करें",
      },
    },
    registerComplaint: {
      title: "शिकायत दर्ज करें",
      departments: { electricity: "बिजली", gas: "गैस", water: "पानी", waste: "कचरा प्रबंधन" },
      selectDepartment: "विभाग चुनें",
      verifyIdentity: "अपनी पहचान सत्यापित करें",
      authMethods: { mobile: "मोबाइल ओटीपी", consumer: "उपभोक्ता आईडी + ओटीपी" },
      enterMobile: "मोबाइल नंबर दर्ज करें",
      enterConsumer: "उपभोक्ता आईडी दर्ज करें",
      enterOtp: "ओटीपी दर्ज करें",
      otpPlaceholder: "6 अंकों का ओटीपी दर्ज करें",
      complaintType: "शिकायत प्रकार चुनें",
      complaintTypes: {
        no_supply: "बिजली/गैस/पानी नहीं",
        billing: "बिल संबंधी समस्या",
        leakage: "लीकेज",
        delay: "सेवा में देरी",
        other: "अन्य",
      },
      descriptionHeading: "अपनी समस्या का विवरण दें (वैकल्पिक)",
      descriptionPlaceholder: "यहाँ शिकायत का विवरण लिखें...",
      successHeading: "शिकायत दर्ज हो गई!",
      complaintNumber: "शिकायत संख्या",
      department: "विभाग",
      resolution: "अनुमानित समाधान",
      resolutionEta: "3-5 कार्य दिवस",
      buttons: { submit: "जमा करें", skip: "स्किप", next: "आगे" },
    },
    trackStatus: {
      title: "स्थिति ट्रैक करें",
      selectType: "आप क्या ट्रैक करना चाहते हैं?",
      trackTypes: {
        complaint: "शिकायत स्थिति",
        service: "सेवा आवेदन",
        payment: "भुगतान स्थिति",
      },
      enterId: "ट्रैकिंग आईडी या मोबाइल नंबर दर्ज करें",
      idPlaceholder: "उदा. CMP-2026-00482",
      trackButton: "ट्रैक करें",
      statusHeading: "स्थिति विवरण",
      steps: ["सबमिट", "समीक्षा में", "प्रगति पर", "निर्णीत"],
      labels: {
        trackingId: "ट्रैकिंग आईडी",
        status: "स्थिति",
        lastUpdated: "अंतिम अद्यतन",
        department: "विभाग",
        officer: "नियुक्त अधिकारी",
      },
      statusValue: "प्रगति पर",
    },
    applyService: {
      title: "सेवा के लिए आवेदन",
      selectService: "सेवा चुनें",
      services: {
        electricity: "नई बिजली कनेक्शन",
        gas: "नया गैस कनेक्शन",
        water: "नया पानी कनेक्शन",
      },
      otpStepHeading: "मोबाइल ओटीपी द्वारा सत्यापित करें",
      mobilePlaceholder: "मोबाइल नंबर",
      otpPlaceholder: "ओटीपी दर्ज करें",
      subSteps: ["व्यक्तिगत विवरण", "पता विवरण", "समीक्षा और जमा"],
      personalHeading: "व्यक्तिगत विवरण",
      namePlaceholder: "पूरा नाम",
      aadhaarPlaceholder: "आधार नंबर",
      addressHeading: "पता विवरण",
      addressPlaceholder: "पूरा पता",
      cityPlaceholder: "शहर",
      pincodePlaceholder: "पिन कोड",
      reviewHeading: "समीक्षा और जमा",
      reviewLabels: { service: "सेवा", name: "नाम", address: "पता", city: "शहर" },
      submitApplication: "आवेदन जमा करें",
      successHeading: "आवेदन जमा हो गया!",
      applicationId: "आवेदन आईडी",
      processing: "अनुमानित प्रक्रिया",
    },
    help: {
      title: "सहायता एवं सहयोग",
      topics: {
        pay: "बिल कैसे भरें",
        complaint: "शिकायत कैसे दर्ज करें",
        track: "स्थिति कैसे ट्रैक करें",
        support: "सहायता से बात करें",
        faq: "सामान्य प्रश्न",
      },
      content: {
        pay: "1. होम स्क्रीन पर 'बिल भुगतान' पर टैप करें।\n2. विभाग चुनें।\n3. उपभोक्ता आईडी दर्ज करें, क्यूआर स्कैन करें या मोबाइल नंबर दर्ज करें।\n4. बिल विवरण देखें।\n5. भुगतान विधि चुनें और भुगतान पूर्ण करें।\n6. रसीद प्राप्त करें।",
        complaint: "1. 'शिकायत दर्ज करें' पर टैप करें।\n2. विभाग चुनें।\n3. ओटीपी से पहचान सत्यापित करें।\n4. शिकायत प्रकार चुनें।\n5. विवरण जोड़ें (वैकल्पिक)।\n6. शिकायत संख्या प्राप्त करें।",
        track: "1. 'स्थिति ट्रैक करें' पर टैप करें।\n2. ट्रैकिंग प्रकार चुनें।\n3. ट्रैकिंग आईडी दर्ज करें।\n4. स्थिति देखें।",
        support: "तत्काल सहायता के लिए हमारी हेल्पलाइन पर कॉल करें:\n\n📞 1800-XXX-XXXX (टोल फ्री)\n\n24/7 उपलब्ध",
        faq: "प्र: किन दस्तावेजों की आवश्यकता है?\nउ: आधार कार्ड और पता प्रमाण।\n\nप्र: सेवा में कितना समय लगता है?\nउ: 7-10 कार्य दिवस।\n\nप्र: क्या नकद भुगतान संभव है?\nउ: नहीं, केवल डिजिटल भुगतान स्वीकार हैं।",
      },
      audioOn: "ऑडियो चालू",
      audioOff: "ऑडियो बंद",
    },
    notFound: {
      message: "ओह! पेज नहीं मिला",
      cta: "होम पर लौटें",
    },
  },
  mr: {
    common: {
      kioskTitle: "नागरिक उपयुक्त सुविधा किऑस्क",
      back: "मागे",
      home: "मुख्यपृष्ठ",
      skip: "वगळा",
      next: "पुढे",
      submit: "सबमिट",
      verify: "सत्यापित करा",
      verifyContinue: "सत्यापित करून पुढे चला",
      sendOtp: "ओटीपी पाठवा",
      otpSentTo: "मोबाइलवर ओटीपी पाठवला",
      otpSentRegistered: "नोंदणीकृत मोबाइलवर ओटीपी पाठवला",
      backToHome: "मुख्यपृष्ठावर परत जा",
      printReceipt: "पावती छापा",
      sendSms: "एसएमएस पाठवा",
      sendingReceiptSms: "पावती एसएमएस पाठवित आहोत",
      receiptSmsSent: "पावती एसएमएस पाठवला गेला",
      printingReceipt: "पावती छापली जात आहे",
      receiptPrinted: "पावती छापली गेली, स्लॉटमधून घ्या",
      printingStatus: "स्थिती छापली जात आहे",
      statusPrinted: "स्थिती छापली गेली, स्लॉटमधून घ्या",
      printStatus: "स्थिती छापा",
      callNow: "आता कॉल करा",
      helpline: "हेल्पलाइन: 1800-XXX-XXXX (टोल फ्री, 24/7)",
      listen: "ही स्क्रीन ऐका",
      stopListening: "ऑडिओ थांबवा",
      speechUnavailable: "या उपकरणावर भाषण उपलब्ध नाही",
      languageNames: { en: "English", hi: "हिन्दी", mr: "मराठी" },
      textSize: {
        heading: "मजकूर प्रवेश",
        helper: "इथे फॉन्ट आकार बदला",
        default: "मूळ आकार",
        increase: "मोठा करा",
        decrease: "लहान करा",
      },
    },
    index: {
      instruction: "सुरू करण्यासाठी सेवा स्पर्श करा",
      services: {
        payBill: "बिल भरा",
        registerComplaint: "तक्रार नोंदवा",
        trackStatus: "स्थिती ट्रॅक करा",
        applyService: "सेवेसाठी अर्ज",
        help: "मदत",
      },
    },
    payBill: {
      title: "बिल भरा",
      departments: { electricity: "वीज", gas: "गॅस", water: "पाणी" },
      selectDepartment: "विभाग निवडा",
      chooseInputMethod: "इनपुट पद्धत निवडा",
      inputMethods: {
        consumer: { label: "ग्राहक आयडी प्रविष्ट करा", placeholder: "उदा. 123456789", heading: "ग्राहक आयडी प्रविष्ट करा" },
        mobile: { label: "मोबाइल क्रमांक प्रविष्ट करा", placeholder: "उदा. 9876543210", heading: "मोबाइल क्रमांक प्रविष्ट करा" },
      },
      submitInput: "सबमिट",
      billDetails: {
        heading: "बिल तपशील",
        consumerName: "ग्राहक नाव",
        department: "विभाग",
        amountDue: "बाकी रक्कम",
        dueDate: "देय तारीख",
        proceed: "पेमेंट सुरू करा",
      },
      paymentMethod: {
        heading: "पेमेंट पद्धत निवडा",
        methods: { upi: "यूपीआय", debit: "डेबिट कार्ड", netbanking: "नेट बँकिंग" },
      },
      success: {
        heading: "पेमेंट यशस्वी!",
        receiptHeading: "पावती",
        consumerId: "ग्राहक आयडी",
        name: "नाव",
        mobile: "मोबाइल",
        billFor: "विभाग",
        transactionId: "व्यवहार आयडी",
        amountPaid: "देय रक्कम",
      },
      otp: {
        heading: "ओटीपी प्रविष्ट करा",
        placeholder: "६ अंकी ओटीपी प्रविष्ट करा",
      },
    },
    registerComplaint: {
      title: "तक्रार नोंदवा",
      departments: { electricity: "वीज", gas: "गॅस", water: "पाणी", waste: "कचरा व्यवस्थापन" },
      selectDepartment: "विभाग निवडा",
      verifyIdentity: "ओळख सत्यापित करा",
      authMethods: { mobile: "मोबाइल ओटीपी", consumer: "ग्राहक आयडी + ओटीपी" },
      enterMobile: "मोबाइल क्रमांक प्रविष्ट करा",
      enterConsumer: "ग्राहक आयडी प्रविष्ट करा",
      enterOtp: "ओटीपी प्रविष्ट करा",
      otpPlaceholder: "६ अंकी ओटीपी टाका",
      complaintType: "तक्रारीचा प्रकार निवडा",
      complaintTypes: {
        no_supply: "पुरवठा नाही",
        billing: "बिल समस्या",
        leakage: "गळती",
        delay: "सेवा विलंब",
        other: "इतर",
      },
      descriptionHeading: "आपली समस्या वर्णन करा (ऐच्छिक)",
      descriptionPlaceholder: "आपली तक्रार येथे लिहा...",
      successHeading: "तक्रार नोंदली गेली!",
      complaintNumber: "तक्रार क्रमांक",
      department: "विभाग",
      resolution: "अनुमानित निराकरण",
      resolutionEta: "3-5 कार्यदिवस",
      buttons: { submit: "सबमिट", skip: "वगळा", next: "पुढे" },
    },
    trackStatus: {
      title: "स्थिती ट्रॅक करा",
      selectType: "आपण काय ट्रॅक करू इच्छिता?",
      trackTypes: {
        complaint: "तक्रार स्थिती",
        service: "सेवा अर्ज",
        payment: "पेमेंट स्थिती",
      },
      enterId: "ट्रॅकिंग आयडी किंवा मोबाइल क्रमांक प्रविष्ट करा",
      idPlaceholder: "उदा. CMP-2026-00482",
      trackButton: "ट्रॅक करा",
      statusHeading: "स्थिती तपशील",
      steps: ["सबमिट", "पुनरावलोकनात", "प्रगतीमध्ये", "निकाली"],
      labels: {
        trackingId: "ट्रॅकिंग आयडी",
        status: "स्थिती",
        lastUpdated: "शेवटचे अद्यतन",
        department: "विभाग",
        officer: "नियुक्त अधिकारी",
      },
      statusValue: "प्रगतीमध्ये",
    },
    applyService: {
      title: "सेवेसाठी अर्ज",
      selectService: "सेवा निवडा",
      services: {
        electricity: "नवीन वीज जोडणी",
        gas: "नवीन गॅस जोडणी",
        water: "नवीन पाणी जोडणी",
      },
      otpStepHeading: "मोबाइल ओटीपीद्वारे सत्यापित करा",
      mobilePlaceholder: "मोबाइल क्रमांक",
      otpPlaceholder: "ओटीपी प्रविष्ट करा",
      subSteps: ["वैयक्तिक तपशील", "पत्ता तपशील", "पुनरावलोकन आणि सबमिट"],
      personalHeading: "वैयक्तिक तपशील",
      namePlaceholder: "पूर्ण नाव",
      aadhaarPlaceholder: "आधार क्रमांक",
      addressHeading: "पत्ता तपशील",
      addressPlaceholder: "संपूर्ण पत्ता",
      cityPlaceholder: "शहर",
      pincodePlaceholder: "पिन कोड",
      reviewHeading: "पुनरावलोकन आणि सबमिट",
      reviewLabels: { service: "सेवा", name: "नाव", address: "पत्ता", city: "शहर" },
      submitApplication: "अर्ज सबमिट करा",
      successHeading: "अर्ज सबमिट झाला!",
      applicationId: "अर्ज क्रमांक",
      processing: "अनुमानित प्रक्रिया",
    },
    help: {
      title: "मदत आणि सहाय्य",
      topics: {
        pay: "बिल कसे भरावे",
        complaint: "तक्रार कशी नोंदवावी",
        track: "स्थिती कशी ट्रॅक करावी",
        support: "सपोर्टशी बोला",
        faq: "नेहमी विचारले जाणारे प्रश्न",
      },
      content: {
        pay: "1. मुख्यपृष्ठावर 'बिल भरा' वर टॅप करा.\n2. विभाग निवडा.\n3. ग्राहक आयडी टाका, क्यूआर स्कॅन करा किंवा मोबाइल क्रमांक द्या.\n4. बिल तपशील पहा.\n5. पेमेंट पद्धत निवडा आणि पेमेंट पूर्ण करा.\n6. पावती घ्या.",
        complaint: "1. 'तक्रार नोंदवा' वर टॅप करा.\n2. विभाग निवडा.\n3. ओटीपीने ओळख सत्यापित करा.\n4. तक्रार प्रकार निवडा.\n5. वर्णन जोडा (ऐच्छिक).\n6. तक्रार क्रमांक मिळवा.",
        track: "1. 'स्थिती ट्रॅक करा' वर टॅप करा.\n2. ट्रॅकिंग प्रकार निवडा.\n3. ट्रॅकिंग आयडी प्रविष्ट करा.\n4. स्थिती पहा.",
        support: "तत्काळ मदतीसाठी आमच्या हेल्पलाइनवर कॉल करा:\n\n📞 1800-XXX-XXXX (टोल फ्री)\n\n24/7 उपलब्ध",
        faq: "प्र: कोणते दस्तऐवज आवश्यक आहेत?\nउ: आधार कार्ड आणि पत्ता पुरावा.\n\nप्र: सेवेला किती वेळ लागतो?\nउ: 7-10 कार्यदिवस.\n\nप्र: रोखीने पेमेंट करता येते का?\nउ: नाही, फक्त डिजिटल पेमेंट स्वीकारले जातात.",
      },
      audioOn: "ऑडिओ सुरू",
      audioOff: "ऑडिओ बंद",
    },
    notFound: {
      message: "अरे! पृष्ठ सापडले नाही",
      cta: "मुख्यपृष्ठावर परत जा",
    },
  },
};
