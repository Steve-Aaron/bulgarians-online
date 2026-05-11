const translations = {
  bg: {
    // Nav
    nav: {
      home: 'Начало',
      survey: 'Анкета',
      privacy: 'Поверителност',
      contact: 'Контакти',
      takeSurvey: 'Вземете участие',
    },

    // Loading
    loading: {
      text: 'Зареждане',
    },

    // Hero
    hero: {
      heading: 'Какви трябва да бъдат приоритетите на Радев?',
      subheading: 'Кажете ни какво мислите, че трябва да бъдат приоритетите на следващия министър-председател.',
      cta: 'Вземете участие',
    },

    // About
    about: {
      badge: 'За нас',
      heading: 'Гласът на обикновените българи',
      body: 'Bulgarians Online събира мнения от обикновени българи и ги споделя с широката общественост. Работим в социалните мрежи, за да усилим обикновените гласове и да провокираме разговор по важните теми.',
      body2: 'Вярваме, че всяко мнение има значение — и че истинската демокрация се изгражда от дъното нагоре. Присъединете се към разговора.',
    },

    // Survey CTA (mid-page)
    surveyCta: {
      badge: 'Вземи участие',
      heading: 'Вашето мнение има значение',
      body: 'Участвайте в нашата анкета и помогнете да формираме разговора около приоритетите на България.',
      cta: 'Започнете анкетата',
    },

    // Team
    team: {
      badge: 'Екипът ни',
      heading: 'Хората зад Bulgarians Online',
      member1Name: 'Христо Димитров',
      member1Role: 'Съосновател и редактор',
      member1Bio: 'Журналист с над 10 години опит в разследващата журналистика и анализа на политически процеси в България.',
      member2Name: 'Марина Стоянова',
      member2Role: 'Съосновател и стратег',
      member2Bio: 'Специалист по дигитални медии и обществени комуникации, посветена на усилване на гражданските гласове.',
    },

    // Socials
    socials: {
      badge: 'Социални мрежи',
      heading: 'Намерете ни в мрежата',
      body: 'Следвайте ни в социалните мрежи за последни новини, резултати от анкети и разговори, които вълнуват България.',
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'YouTube',
      tiktok: 'TikTok',
    },

    // Final CTA
    finalCta: {
      heading: 'Имате история за споделяне?',
      body: 'Кажете ни какво мислите — вашият глас ще бъде чут.',
      cta: 'Свържете се с нас',
    },

    // Footer
    footer: {
      tagline: 'Гласът на обикновените българи.',
      rights: '© 2026 Bulgarians Online. Всички права запазени.',
      privacy: 'Поверителност',
      contact: 'Контакти',
      madeWith: 'Направено с ❤️ за България',
    },

    // Survey Page
    survey: {
      pageTitle: 'Анкета',
      pageSubtitle: 'Участвайте в нашата анкета и споделете вашето мнение.',
      submit: 'Изпратете отговорите',
      submitting: 'Изпращане...',
      successTitle: 'Благодаря ви!',
      successBody: 'Вашите отговори бяха записани успешно. Вашето мнение е от голямо значение за нас.',
      errorTitle: 'Грешка при изпращане',
      errorBody: 'Моля, опитайте отново.',
      required: 'Задължително поле',
      selectAll: 'Изберете всички приложими',
      selectOne: 'Изберете един отговор',
      freeText: 'Вашият отговор...',
      nextBtn: 'Следващ въпрос',
      backBtn: 'Назад',
      personalTitle: 'Вашите данни',
      personalSubtitle: 'Последна стъпка — споделете малко за себе си.',
      namePlaceholder: 'Вашето пълно име',
      emailPlaceholder: 'Имейл адрес',
      cityPlaceholder: 'Вашият град',
      consentLabel: 'Съгласявам се данните ми да се използват за изследователски цели.',
      questions: {
        q1: {
          text: 'Какви трябва да бъдат основните приоритети на следващия министър-председател?',
          hint: 'Изберете всички, които смятате за приложими',
          options: [
            'Разходи за живот',
            'Корупция',
            'Здравеопазване',
            'Образование',
            'Укрепване на отношенията ни с Русия',
            'Укрепване на отношенията ни с Европейския съюз',
            'Национална отбрана и войната в Украйна',
            'Имиграция',
            'Данъци',
            'Пенсии',
            'Жилищно настаняване',
            'Околна среда',
            'Транспорт',
            'Нещо друго',
          ],
        },
        q2: {
          text: 'Смятате ли, че Радев върши добра работа като президент?',
          options: ['Да', 'Не', 'Не съм сигурен/а'],
        },
        q3: {
          text: 'Смятате ли, че Радев върши добра работа за намаляване на безработицата?',
          options: ['Да', 'Не', 'Не съм сигурен/а'],
        },
        q4: {
          text: 'Смятате ли, че Радев върши добра работа в борбата с инфлацията?',
          options: ['Да', 'Не', 'Не съм сигурен/а'],
        },
        q5: {
          text: 'Съгласни ли сте с твърдението: „Смятам, че Радев трябва да укрепи отношенията на страната ни с Русия."',
          options: ['Да', 'Не', 'Не съм сигурен/а'],
        },
        q6: {
          text: 'Съгласни ли сте с твърдението: „Смятам, че Радев трябва да укрепи отношенията на страната ни с Европейския съюз."',
          options: ['Да', 'Не', 'Не съм сигурен/а'],
        },
        q7: {
          text: 'Как бихте описали посоката, в която върви страната?',
          hint: 'Споделете вашите мисли свободно',
        },
      },
    },

    // Privacy Page
    privacy: {
      title: 'Политика за поверителност',
      lastUpdated: 'Последно актуализирано: май 2025',
      intro: 'Bulgarians Online се ангажира да защитава вашата поверителност. Тази политика обяснява как събираме, използваме и съхраняваме вашите данни.',
      sections: [
        {
          heading: 'Каква информация събираме',
          body: 'Събираме само отговорите, предоставени от вас в нашите анкети и формуляри за контакт. Не събираме лична информация, освен ако не сте я предоставили доброволно.',
        },
        {
          heading: 'Как използваме вашата информация',
          body: 'Отговорите от анкетите се използват единствено за изследователски и аналитични цели. Никога не продаваме и не споделяме вашите данни с трети страни за търговски цели.',
        },
        {
          heading: 'Съхранение на данни',
          body: 'Вашите данни се съхраняват сигурно и се задържат само за периода, необходим за постигане на целта, за която са събрани.',
        },
        {
          heading: 'Вашите права',
          body: 'Имате право да поискате достъп, коригиране или изтриване на вашите лични данни по всяко време. За запитвания относно вашите данни се свържете с нас чрез страницата за контакти.',
        },
        {
          heading: 'Бисквитки',
          body: 'Нашият сайт използва само основни бисквитки, необходими за функционирането му. Не използваме бисквитки за проследяване или реклама.',
        },
        {
          heading: 'Промени в тази политика',
          body: 'Можем да актуализираме тази политика периодично. Всякакви промени ще бъдат публикувани на тази страница с актуализирана дата.',
        },
        {
          heading: 'Свържете се с нас',
          body: 'Ако имате въпроси относно нашата политика за поверителност, моля свържете се с нас чрез страницата за контакти.',
        },
      ],
    },

    // Contact Page
    contact: {
      title: 'Свържете се с нас',
      subtitle: 'Имате история? Въпрос? Ще се радваме да чуем от вас.',
      namePlaceholder: 'Вашето име',
      emailPlaceholder: 'Имейл адрес',
      messagePlaceholder: 'Вашето съобщение...',
      submitBtn: 'Изпратете съобщение',
      submitting: 'Изпращане...',
      successTitle: 'Съобщението е изпратено!',
      successBody: 'Ще се свържем с вас възможно най-скоро.',
      errorBody: 'Нещо се обърка. Моля, опитайте отново.',
      followUs: 'Последвайте ни',
    },
  },

  en: {
    nav: {
      home: 'Home',
      survey: 'Survey',
      privacy: 'Privacy',
      contact: 'Contact',
      takeSurvey: 'Take part',
    },

    loading: {
      text: 'Loading',
    },

    hero: {
      heading: "What should be Radev's priorities?",
      subheading: "Let us know what you think the next Prime Minister's priorities should be.",
      cta: 'Take our survey',
    },

    about: {
      badge: 'About Us',
      heading: 'The voice of ordinary Bulgarians',
      body: 'Bulgarians Online takes thoughts from ordinary Bulgarians and shares them with the general public. We work across social media to amplify ordinary voices and start conversations on the issues that matter.',
      body2: 'We believe every opinion counts — and that real democracy is built from the ground up. Join the conversation.',
    },

    surveyCta: {
      badge: 'Get involved',
      heading: 'Your opinion matters',
      body: 'Take part in our survey and help shape the conversation around Bulgaria\'s priorities.',
      cta: 'Start the survey',
    },

    team: {
      badge: 'Our Team',
      heading: 'The people behind Bulgarians Online',
      member1Name: 'Hristo Dimitrov',
      member1Role: 'Co-Founder & Editor',
      member1Bio: 'A journalist with over 10 years of experience in investigative reporting and political analysis in Bulgaria.',
      member2Name: 'Marina Stoyanova',
      member2Role: 'Co-Founder & Strategist',
      member2Bio: 'A digital media and public communications specialist dedicated to amplifying civic voices.',
    },

    socials: {
      badge: 'Social Media',
      heading: 'Find us online',
      body: 'Follow us on social media for the latest news, survey results and conversations shaping Bulgaria.',
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'YouTube',
      tiktok: 'TikTok',
    },

    finalCta: {
      heading: 'Have a story to share?',
      body: 'Let us know what you think — your voice will be heard.',
      cta: 'Get in touch',
    },

    footer: {
      tagline: 'The voice of ordinary Bulgarians.',
      rights: '© 2026 Bulgarians Online. All rights reserved.',
      privacy: 'Privacy',
      contact: 'Contact',
      madeWith: 'Made with ❤️ for Bulgaria',
    },

    survey: {
      pageTitle: 'Survey',
      pageSubtitle: 'Take part in our survey and share your opinion.',
      submit: 'Submit answers',
      submitting: 'Submitting...',
      successTitle: 'Thank you!',
      successBody: 'Your answers have been recorded successfully. Your opinion matters greatly to us.',
      errorTitle: 'Submission error',
      errorBody: 'Please try again.',
      required: 'Required field',
      selectAll: 'Select all that apply',
      selectOne: 'Select one answer',
      freeText: 'Your answer...',
      nextBtn: 'Next question',
      backBtn: 'Back',
      personalTitle: 'Your details',
      personalSubtitle: 'Final step — tell us a little about yourself.',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'Email address',
      cityPlaceholder: 'Your city',
      consentLabel: 'I agree for my data to be used for research purposes.',
      questions: {
        q1: {
          text: "What should be the next Prime Minister's top priorities?",
          hint: 'Select all that apply',
          options: [
            'Cost of living',
            'Corruption',
            'Healthcare',
            'Education',
            'Strengthening our relationship with Russia',
            'Strengthening our relationship with the European Union',
            'National Defence & the war in Ukraine',
            'Immigration',
            'Tax',
            'Pensions',
            'Housing',
            'The environment',
            'Transport',
            'Something else',
          ],
        },
        q2: {
          text: 'Do you think that Radev is doing a good job as Prime Minister?',
          options: ['Yes', 'No', 'Not Sure'],
        },
        q3: {
          text: 'Do you think that Radev is doing a good job reducing unemployment?',
          options: ['Yes', 'No', 'Not Sure'],
        },
        q4: {
          text: 'Do you think that Radev is doing a good job at tackling inflation?',
          options: ['Yes', 'No', 'Not Sure'],
        },
        q5: {
          text: 'Do you agree with the following statement: "I think that Radev should strengthen our country\'s relationship with Russia."',
          options: ['Yes', 'No', 'Not Sure'],
        },
        q6: {
          text: 'Do you agree with the following statement: "I think that Radev should strengthen our country\'s relationship with the European Union."',
          options: ['Yes', 'No', 'Not Sure'],
        },
        q7: {
          text: 'How would you describe the way that the country is going?',
          hint: 'Share your thoughts freely',
        },
      },
    },

    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: May 2025',
      intro: 'Bulgarians Online is committed to protecting your privacy. This policy explains how we collect, use and store your data.',
      sections: [
        {
          heading: 'What information we collect',
          body: 'We only collect responses provided by you in our surveys and contact forms. We do not collect personal information unless you have voluntarily provided it.',
        },
        {
          heading: 'How we use your information',
          body: 'Survey responses are used solely for research and analytical purposes. We never sell or share your data with third parties for commercial purposes.',
        },
        {
          heading: 'Data storage',
          body: 'Your data is stored securely and retained only for the period necessary to fulfil the purpose for which it was collected.',
        },
        {
          heading: 'Your rights',
          body: 'You have the right to request access, correction or deletion of your personal data at any time. For data enquiries, please contact us via the contact page.',
        },
        {
          heading: 'Cookies',
          body: 'Our site uses only essential cookies required for it to function. We do not use tracking or advertising cookies.',
        },
        {
          heading: 'Changes to this policy',
          body: 'We may update this policy periodically. Any changes will be posted on this page with an updated date.',
        },
        {
          heading: 'Contact us',
          body: 'If you have questions about our privacy policy, please contact us via the contact page.',
        },
      ],
    },

    contact: {
      title: 'Contact Us',
      subtitle: 'Have a story? A question? We\'d love to hear from you.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Email address',
      messagePlaceholder: 'Your message...',
      submitBtn: 'Send message',
      submitting: 'Sending...',
      successTitle: 'Message sent!',
      successBody: 'We\'ll be in touch as soon as possible.',
      errorBody: 'Something went wrong. Please try again.',
      followUs: 'Follow us',
    },
  },
}

export default translations
