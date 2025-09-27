document.addEventListener('DOMContentLoaded', function() {
    // --- Initialize Lucide Icons ---
    lucide.createIcons();

    // --- Language Toggle Logic ---
    const langToggle = document.getElementById('language-toggle');
    function setLanguage(isMarathi) {
        document.querySelectorAll('.lang-mr').forEach(el => el.classList.toggle('hidden', !isMarathi));
        document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', isMarathi));
        // Store user preference
        localStorage.setItem('language', isMarathi ? 'mr' : 'en');

        // Update search placeholder language
        const searchInput = document.getElementById('service-search');
        if (searchInput) {
            searchInput.placeholder = isMarathi ? "सेवा शोधा..." : "Search for a service...";
        }
    }

    if (langToggle) {
        // Check for saved preference, default to Marathi if nothing is set
        const savedLang = localStorage.getItem('language');
        const isMarathi = savedLang === 'mr' || savedLang === null; 
        langToggle.checked = isMarathi;
        setLanguage(isMarathi);
        
        langToggle.addEventListener('change', function() {
            setLanguage(this.checked);
        });
    }


    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            header.style.top = `-${header.offsetHeight}px`; // Hide on scroll down
        } else {
            header.style.top = "0"; // Show on scroll up
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // --- Service Page Logic ---
    if (document.body.id === 'services-page') {
        const servicesData = {
            gov: {
                title: { en: "Government Document Services", mr: "सरकारी कागदपत्र सेवा" },
                services: [
                    { name: { en: "Caste Certificate", mr: "जातिचे प्रमाणपत्र" }, docs: { en: ["School Leaving Certificate", "Aadhaar Card", "Ration Card"], mr: ["शाळा सोडल्याचा दाखला", "आधार कार्ड", "रेशन कार्ड"] } },
                    { name: { en: "Caste Validity", mr: "कास्ट व्हॅलिडिटी" }, docs: { en: ["Caste Certificate", "School Leaving Certificate of Father/Relative", "Affidavit"], mr: ["जातिचे प्रमाणपत्र", "वडिलांचा/नातेवाईकांचा शाळा सोडल्याचा दाखला", "शपथपत्र"] } },
                    { name: { en: "EWS Certificate", mr: "EWS सर्टिफिकेट" }, docs: { en: ["Aadhaar Card", "PAN Card", "Income Proof", "Photos"], mr: ["आधार कार्ड", "पॅन कार्ड", "उत्पन्नाचा पुरावा", "फोटो"] } },
                    { name: { en: "Non-Creamy Layer", mr: "नॉन क्रीमिलयर"}, docs: {en: ["Income Certificate", "Caste Certificate", "Aadhaar Card"], mr: ["उत्पन्नाचा दाखला", "जातिचा दाखला", "आधार कार्ड"]}},
                    { name: { en: "Domicile Certificate", mr: "डोमसाईल" }, docs: { en: ["Birth Certificate", "Aadhaar Card", "Residence Proof"], mr: ["जन्म प्रमाणपत्र", "आधार कार्ड", "रहिवासी पुरावा"] } },
                    { name: { en: "Income Certificate", mr: "उत्पन्नाचा दाखला" }, docs: { en: ["Aadhaar Card", "PAN Card", "Salary Slip/ITR/Talathi Report"], mr: ["आधार कार्ड", "पॅन कार्ड", "पगार पत्रक/ITR/तलाठी अहवाल"] } },
                    { name: { en: "Shop Act License", mr: "शॉप अँक्ट लायसन्स" }, docs: { en: ["Owner's Aadhaar & PAN", "Shop Photo with Signboard", "Rental Agreement"], mr: ["मालकाचे आधार आणि पॅन", "साईनबोर्डसह दुकानाचा फोटो", "भाडे करार"] } },
                    { name: { en: "Udyam Aadhar", mr: "उद्योग आधार" }, docs: { en: ["Aadhaar Card (Linked with Mobile)", "Bank Account Details"], mr: ["आधार कार्ड (मोबाइल लिंक केलेले)", "बँक खाते तपशील"]}},
                    { name: { en: "Senior Citizen Certificate", mr: "ज्येष्ठ नागरिक दाखला" }, docs: { en: ["Aadhaar Card", "Age Proof (School LC/Passport)", "Photos"], mr: ["आधार कार्ड", "वयाचा पुरावा (शाळा LC/पासपोर्ट)", "फोटो"] } },
                    { name: { en: "Voter Registration", mr: "मतदार नोंदणी" }, docs: { en: ["Aadhaar Card", "Address Proof", "Age Proof (if new voter)"], mr: ["आधार कार्ड", "पत्त्याचा पुरावा", "वयाचा पुरावा (नवीन मतदार असल्यास)"] } },
                    { name: { en: "Marriage Certificate", mr: "विवाह प्रमाणपत्र" }, docs: { en: ["Wedding Invitation Card", "Photos of Couple", "Aadhaar Cards of Couple & Witnesses"], mr: ["लग्नाची पत्रिका", "जोडप्याचे फोटो", "जोडपे आणि साक्षीदारांचे आधार कार्ड"] } },
                    { name: { en: "Birth Certificate", mr: "जन्म प्रमाणपत्र" }, docs: { en: ["Hospital Discharge Summary", "Parents' Aadhaar Cards"], mr: ["रुग्णालयाचा डिस्चार्ज सारांश", "पालकांचे आधार कार्ड"] } },
                    { name: { en: "Death Certificate", mr: "मृत्यू प्रमाणपत्र" }, docs: { en: ["Doctor's Certificate of Death", "Deceased's Aadhaar Card"], mr: ["मृत्यूचा डॉक्टर प्रमाणपत्र", "मृताचे आधार कार्ड"] } },
                    { name: { en: "Labour Card", mr: "कामगार कार्ड" }, docs: { en: ["Aadhaar Card", "Bank Passbook", "90 days work certificate"], mr: ["आधार कार्ड", "बँक पासबुक", "९० दिवसांचे कामाचे प्रमाणपत्र"] } },
                    { name: { en: "Jeevan Pramaan (Life Certificate)", mr: "जीवन प्रमाण (हयातीचा दाखला)" }, docs: { en: ["Aadhaar Card", "PPO Number", "Bank Account Details"], mr: ["आधार कार्ड", "PPO क्रमांक", "बँक खाते तपशील"] } },
                ]
            },
            aadhaar: {
                title: { en: "Aadhaar / PAN Services", mr: "आधार / पॅन सेवा" },
                services: [
                    { name: { en: "PAN Card (New/Correction)", mr: "पॅन कार्ड (नवीन/दुरुस्ती)" }, docs: { en: ["Aadhaar Card", "Photos"], mr: ["आधार कार्ड", "फोटो"] } },
                    { name: { en: "Aadhaar Update (Address, Mobile)", mr: "आधार अपडेट (पत्ता, मोबाईल)" }, docs: { en: ["Original Aadhaar Card", "Relevant Proof Document for update"], mr: ["मूळ आधार कार्ड", "अपडेटसाठी संबंधित पुरावा दस्तऐवज"] } },
                    { name: { en: "Ration Card Updates", mr: "रेशन कार्डमध्ये नाव वाढवणे / कमी करणे"}, docs: {en: ["Original Ration Card", "Aadhaar of all members"], mr: ["मूळ रेशन कार्ड", "सर्व सदस्यांचे आधार कार्ड"]}},
                    { name: { en: "PAN-Aadhaar Link", mr: "पॅन-आधार लिंक" }, docs: { en: ["PAN Card", "Aadhaar Card"], mr: ["पॅन कार्ड", "आधार कार्ड"] } },
                    { name: { en: "Download e-Aadhaar", mr: "ई-आधार डाउनलोड" }, docs: { en: ["Aadhaar Number or Enrollment ID"], mr: ["आधार क्रमांक किंवा नावनोंदणी आयडी"] } },
                    { name: { en: "Download e-PAN", mr: "ई-पॅन डाउनलोड" }, docs: { en: ["PAN Number or Acknowledgement Number"], mr: ["पॅन क्रमांक किंवा पोचपावती क्रमांक"] } },
                    { name: { en: "Check Aadhaar Status", mr: "आधार स्थिती तपासा" }, docs: { en: ["Enrollment Slip"], mr: ["नावनोंदणी स्लिप"] } },
                    { name: { en: "New Ration Card", mr: "नवीन रेशन कार्ड" }, docs: { en: ["Aadhaar Cards of all members", "Income Proof", "Gas Connection Details"], mr: ["सर्व सदस्यांचे आधार कार्ड", "उत्पन्नाचा पुरावा", "गॅस कनेक्शन तपशील"] } },
                ]
            },
            farmer: {
                 title: { en: "Farmer Services", mr: "शेतकरी सेवा" },
                 services: [
                    { name: { en: "Crop Insurance (Pik Vima)", mr: "पीक विमा" }, docs: { en: ["7/12 Record", "Aadhaar Card", "Bank Passbook"], mr: ["७/१२ उतारा", "आधार कार्ड", "बँक पासबुक"] } },
                    { name: { en: "PM-Kisan Registration", mr: "पीएम-किसान नोंदणी" }, docs: { en: ["Aadhaar Card", "Bank Passbook", "7/12 Record"], mr: ["आधार कार्ड", "बँक पासबुक", "७/१२ उतारा"] } },
                    { name: { en: "Farmer Subsidy KYC", mr: "शेतकरी अनुदान केवायसी" }, docs: { en: ["Aadhaar Card", "Bank Passbook"], mr: ["आधार कार्ड", "बँक पासबुक"] } },
                    { name: { en: "7/12 & 8A Records", mr: "7/12 व 8 अ"}, docs: {en: ["Survey Number or Owner's Name Details"], mr: ["सर्वेक्षण क्रमांक किंवा मालकाच्या नावाचा तपशील"]}},
                    { name: { en: "Farm Equipment Application", mr: "शेती यंत्र अर्ज" }, docs: { en: ["Aadhaar Card", "7/12 Record", "Quotation for equipment"], mr: ["आधार कार्ड", "७/१२ उतारा", "उपकरणांचे कोटेशन"] } },
                    { name: { en: "Soil Health Card", mr: "मृदा आरोग्य कार्ड" }, docs: { en: ["7/12 Record", "Aadhaar Card"], mr: ["७/१२ उतारा", "आधार कार्ड"] } },
                    { name: { en: "e-Pashuhaat Registration", mr: "ई-पशुहाट नोंदणी" }, docs: { en: ["Aadhaar Card", "Animal Details"], mr: ["आधार कार्ड", "प्राण्यांचा तपशील"] } },
                    { name: { en: "Loan Application (Agri)", mr: "कृषी कर्ज अर्ज" }, docs: { en: ["All land and personal documents", "Project Report"], mr: ["सर्व जमीन आणि वैयक्तिक कागदपत्रे", "प्रकल्प अहवाल"] } },
                 ]
            },
             vehicle: {
                 title: { en: "Vehicle Services", mr: "वाहन सेवा" },
                 services: [
                    { name: { en: "Driving License (LL/DL)", mr: "ड्रायव्हिंग लायसन्स (LL/DL)" }, docs: { en: ["Aadhaar Card", "Birth Certificate", "Photos", "Form 1"], mr: ["आधार कार्ड", "जन्म प्रमाणपत्र", "फोटो", "फॉर्म १"] } },
                    { name: { en: "Passport Application", mr: "पासपोर्ट"}, docs: {en: ["Aadhaar Card", "Birth Certificate / School LC", "10th Marksheet"], mr: ["आधार कार्ड", "जन्म प्रमाणपत्र / शाळा LC", "१०वी गुणपत्रिका"]}},
                    { name: { en: "RC Particulars", mr: "RC Particular" }, docs: { en: ["Vehicle RC Book", "Owner's Aadhaar"], mr: ["वाहनाचे आरसी बुक", "मालकाचे आधार"] } },
                    { name: { en: "Vehicle Tax Payment", mr: "वाहन कर भरणे" }, docs: { en: ["Vehicle RC Book", "PAN Card"], mr: ["वाहनाचे आरसी बुक", "पॅन कार्ड"] } },
                    { name: { en: "Challan Payment", mr: "चलन भरणे" }, docs: { en: ["Challan Number or Vehicle Number"], mr: ["चलन क्रमांक किंवा वाहन क्रमांक"] } },
                    { name: { en: "Learner's License Application", mr: " शिकाऊ परवाना अर्ज" }, docs: { en: ["Aadhaar Card", "Age Proof", "Photos"], mr: ["आधार कार्ड", "वयाचा पुरावा", "फोटो"] } },
                    { name: { en: "Vehicle Ownership Transfer", mr: "वाहन मालकी हस्तांतरण" }, docs: { en: ["Original RC", "Form 29 & 30", "Insurance Copy", "Aadhaar of both parties"], mr: ["मूळ आरसी", "फॉर्म २९ आणि ३०", "विम्याची प्रत", "दोन्ही पक्षांचे आधार"] } },
                 ]
            },
            banking: {
                title: { en: "Banking & Financial Services", mr: "बँकिंग आणि आर्थिक सेवा" },
                services: [
                    { name: { en: "Bank Account Opening", mr: "बँक खाते उघडणे" }, docs: { en: ["Aadhaar Card", "PAN Card", "Photos"], mr: ["आधार कार्ड", "पॅन कार्ड", "फोटो"] } },
                    { name: { en: "Money Transfer", mr: "मनी ट्रान्सफर" }, docs: { en: ["Sender's Aadhaar", "Sender & Receiver Bank Details"], mr: ["प्रेषकाचे आधार", "प्रेषक आणि प्राप्तकर्त्याचे बँक तपशील"] } },
                    { name: { en: "Electricity Bill Payment", mr: "वीज बिल भरणे" }, docs: { en: ["Consumer Number or Bill Copy"], mr: ["ग्राहक क्रमांक किंवा बिलाची प्रत"] } },
                    { name: { en: "Mobile/DTH Recharge", mr: "मोबाईल/डीटीएच रिचार्ज" }, docs: { en: ["Mobile Number and Operator Details"], mr: ["मोबाईल नंबर आणि ऑपरेटर तपशील"] } },
                    { name: { en: "Insurance Premium Payment", mr: "विमा हप्ता भरणे" }, docs: { en: ["Policy Number"], mr: ["पॉलिसी क्रमांक"] } },
                    { name: { en: "Credit Card Bill Payment", mr: "क्रेडिट कार्ड बिल भरणे" }, docs: { en: ["Credit Card Number"], mr: ["क्रेडिट कार्ड नंबर"] } },
                    { name: { en: "FASTag Recharge", mr: "फास्टॅग रिचार्ज" }, docs: { en: ["Vehicle Number"], mr: ["वाहन क्रमांक"] } },
                ]
            },
            printing: {
                title: { en: "General & Printing Services", mr: "इतर आणि प्रिंटिंग सेवा" },
                services: [
                    { name: { en: "Passport Photo", mr: "पासपोर्ट फोटो" }, docs: { en: ["No documents needed"], mr: ["कोणत्याही कागदपत्रांची गरज नाही"] } },
                    { name: { en: "Color & B/W Print", mr: "कलर आणि ब्लॅक/व्हाइट प्रिंट" }, docs: { en: ["Digital file (Pen drive/Email/WhatsApp)"], mr: ["डिजिटल फाइल (पेन ड्राइव्ह/ईमेल/वॉट्सॲप)"] } },
                    { name: { en: "Biodata / Resume", mr: "बायोडाटा / Resume" }, docs: { en: ["Personal, Educational, and Work Information"], mr: ["वैयक्तिक, शैक्षणिक आणि कामाची माहिती"] } },
                    { name: { en: "Affidavit / Notary", mr: "अ‍ॅफिडेविट / नोटरी"}, docs: {en: ["Stamp Paper", "Aadhaar Card", "Relevant Documents"], mr: ["स्टॅम्प पेपर", "आधार कार्ड", "संबंधित कागदपत्रे"]}},
                    { name: { en: "Scanning Services", mr: "स्कॅनिंग सेवा" }, docs: { en: ["Original Documents to be scanned"], mr: ["स्कॅन करण्यासाठी मूळ कागदपत्रे"] } },
                    { name: { en: "Lamination", mr: "लॅमिनेशन" }, docs: { en: ["Document to be laminated"], mr: ["लॅमिनेट करण्यासाठी कागदपत्र"] } },
                    { name: { en: "Online Form Filling", mr: "ऑनलाइन फॉर्म भरणे" }, docs: { en: ["All required documents as per the form"], mr: ["फॉर्मनुसार सर्व आवश्यक कागदपत्रे"] } },
                ]
            }
        };

        const grid = document.getElementById('services-list-grid');
        const titleElement = document.getElementById('service-page-title');
        const searchInput = document.getElementById('service-search');
        const modal = document.getElementById('service-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const closeModal = document.querySelector('.close-button');

        const urlParams = new URLSearchParams(window.location.search);
        let category = urlParams.get('category') || 'gov';
        
        let allServices = Object.values(servicesData).flatMap(cat => cat.services);

        function renderServices(servicesToRender) {
            grid.innerHTML = '';
            if (servicesToRender.length === 0) {
                 grid.innerHTML = `<p class="lang-mr">कोणतीही सेवा आढळली नाही.</p><p class="lang-en hidden">No services found.</p>`;
                 return;
            }
            servicesToRender.forEach(service => {
                const card = document.createElement('div');
                card.className = 'service-item-card';
                card.innerHTML = `<h3><span class="lang-mr">${service.name.mr}</span><span class="lang-en hidden">${service.name.en}</span></h3>`;
                card.addEventListener('click', () => {
                    modalTitle.innerHTML = `<span class="lang-mr">${service.name.mr}</span><span class="lang-en hidden">${service.name.en}</span>`;
                    modalBody.innerHTML = `
                        <h4 class="lang-mr">आवश्यक कागदपत्रे:</h4>
                        <h4 class="lang-en hidden">Required Documents:</h4>
                        <ul class="lang-mr">
                            ${service.docs.mr.map(doc => `<li>${doc}</li>`).join('')}
                        </ul>
                        <ul class="lang-en hidden">
                            ${service.docs.en.map(doc => `<li>${doc}</li>`).join('')}
                        </ul>
                    `;
                    modal.style.display = 'block';
                    setLanguage(localStorage.getItem('language') === 'mr' || localStorage.getItem('language') === null);
                });
                grid.appendChild(card);
            });
             setLanguage(localStorage.getItem('language') === 'mr' || localStorage.getItem('language') === null);
        }
        
        // Initial Render
        if (servicesData[category]) {
            titleElement.innerHTML = `<span class="lang-mr">${servicesData[category].title.mr}</span><span class="lang-en hidden">${servicesData[category].title.en}</span>`;
            renderServices(servicesData[category].services);
        } else {
            titleElement.innerHTML = `<span class="lang-mr">सर्व सेवा</span><span class="lang-en hidden">All Services</span>`;
            renderServices(allServices);
        }

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const currentCategoryServices = servicesData[category] ? servicesData[category].services : allServices;
            const filteredServices = currentCategoryServices.filter(service => 
                service.name.en.toLowerCase().includes(searchTerm) || service.name.mr.toLowerCase().includes(searchTerm)
            );
            renderServices(filteredServices);
        });

        // Modal close functionality
        if(modal) {
            closeModal.onclick = () => { modal.style.display = 'none'; };
            window.onclick = (event) => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        }
    }
});

