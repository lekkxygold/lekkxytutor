const canvas = document.getElementById("webinarCanvas");
const ctx = canvas.getContext("2d");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const speakBtn = document.getElementById("speakBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const quizBtn = document.getElementById("quizBtn");
const langSelect = document.getElementById("langSelect");
const voiceSelect = document.getElementById("voiceSelect");
const paceSelect = document.getElementById("paceSelect");
const partPills = document.getElementById("partPills");
const partCounter = document.getElementById("partCounter");
const totalTimerText = document.getElementById("totalTimerText");
const readerLabel = document.getElementById("readerLabel");
const readerText = document.getElementById("readerText");
const footerNote = document.getElementById("footerNote");

const quizBox = document.getElementById("quizBox");
const quizTag = document.getElementById("quizTag");
const quizQ = document.getElementById("quizQ");
const quizOpts = document.getElementById("quizOpts");
const quizAns = document.getElementById("quizAns");
const nextPartBtn = document.getElementById("nextPartBtn");

// Total webinar duration = 5 minutes (300 seconds) across 5 parts (60s each)
const TOTAL_WEBINAR_SEC = 300;
const PART_DURATION_SEC = 60;
const LINE_INTERVAL_SEC = 15;

const LABELS = {
  en: {
    play: "▶ Start Webinar (5 Min)",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    speak: "🔊 Speak Clearly",
    prev: "⏮ Prev",
    next: "Next ⏭",
    restart: "↺ Restart",
    quiz: "❓ Questions",
    part: "Part",
    readerLabel: "Webinar Presenter Script & Live Captions",
    quizTag: "Webinar Q&A After Part",
    nextPart: "Next Part →",
    finishAll: "Complete 5-Min Webinar (Replay Part 1)",
    note: "Total webinar is 5 minutes (05:00) across 5 parts with big slides, live presenter waveform, narration, and questions."
  },
  ig: {
    play: "▶ Malite Webinar (Nkeji 5)",
    pause: "⏸ Kwụsị",
    resume: "▶ Gaa N'ihu",
    speak: "🔊 Kpọọ Olu Nke Ọma",
    prev: "⏮ Azụ",
    next: "Ọzọ ⏭",
    restart: "↺ Malite",
    quiz: "❓ Ajụjụ",
    part: "Nkebi",
    readerLabel: "Okwu Onye Nkuzi Webinar & Ederede Ihụ",
    quizTag: "Ajụjụ Webinar Mgbe Nkebi Gachara",
    nextPart: "Nkebi Ọzọ →",
    finishAll: "Mechaa Webinar Nkeji 5 (Malite na 1)",
    note: "Webinar niile bụ nkeji ise (05:00) n'ime nkebi ise nwere slide dị ukwuu, olu, na ajụjụ mgbe nkebi ọ bụla gachara."
  },
  yo: {
    play: "▶ Bẹ̀rẹ̀ Webinar (Ìṣẹ́jú 5)",
    pause: "⏸ Dádúró",
    resume: "▶ Tẹ̀síwájú",
    speak: "🔊 Ka Ohùn Dáadáa",
    prev: "⏮ Tẹ́lẹ̀",
    next: "Kàn ⏭",
    restart: "↺ Bẹ̀rẹ̀",
    quiz: "❓ Àwọn Ìbéèrè",
    part: "Apá",
    readerLabel: "Ọ̀rọ̀ Olùkọ́ Webinar & Ìfihàn Ìbòjú",
    quizTag: "Ìbéèrè Webinar Lẹ́yìn Apá",
    nextPart: "Apá Kàn →",
    finishAll: "Parí Webinar Ìṣẹ́jú 5 (Bẹ̀rẹ̀ Apá 1)",
    note: "Gbogbo webinar jẹ́ ìṣẹ́jú márùn-ún (05:00) ní apá márùn-ún pẹ̀lú slide ńlá, ohùn, àti ìbéèrè lẹ́yìn apá kọ̀ọ̀kan."
  }
};

const PARTS = [
  {
    id: 1,
    visual: "hosting",
    en: {
      pill: "1. GitHub + Supabase",
      title: "Part 1: GitHub Pages + Supabase",
      subtitle: "Static web hosting paired with cloud auth & database",
      bullets: [
        "GitHub Pages serves your site (HTML, CSS, JS).",
        "Supabase handles sign-up, login, and tables.",
        "Fast, simple setup with no heavy server to run."
      ],
      lines: [
        "Welcome to the lekkxygold tutor webinar. This full session runs for 5 minutes total. In Part 1, GitHub Pages serves your static web pages while Supabase manages user accounts and database rows.",
        "Think of GitHub as your sleek presentation stage and Supabase as your organized cloud database behind the scenes.",
        "Watch the webinar diagram: the browser loads your interface from GitHub and connects over HTTPS to Supabase.",
        "At the end of this part, we will test what you learned with a quick webinar question."
      ],
      question: {
        q: "What is GitHub Pages's main role in a GitHub + Supabase static web app?",
        options: [
          "Serving static front-end files like HTML, CSS, and JavaScript",
          "Replacing database tables with passwords",
          "Hiding secret server passwords inside public HTML"
        ],
        answer: 0,
        explain: "Correct! GitHub Pages serves static front-end files while Supabase handles authentication and database storage."
      }
    },
    ig: {
      pill: "1. GitHub + Supabase",
      title: "Nkebi 1: GitHub Pages + Supabase",
      subtitle: "Nkwado webụsaịtị na nbanye na tebụl data n'igwe",
      bullets: [
        "GitHub Pages na-ebuga ihu gị (HTML, CSS, JS).",
        "Supabase na-elekọta nbanye na tebụl data.",
        "Ọ dị mfe ịmalite n'enweghị sava siri ike."
      ],
      lines: [
        "Nnọọ na webinar lekkxygold tutor. Nkuzi niile bụ nkeji ise. Na Nkebi nke mbụ, GitHub Pages na-ebuga faịlụ webụsaịtị gị ebe Supabase na-edobe nbanye na data.",
        "Chee na GitHub bụ ihu ngosi, ebe Supabase bụ ebe nchekwa data haziri nke ọma.",
        "Lee eserese webinar ahụ ka ị hụ otu braụza si ebuga ihu ma kpọtụrụ Supabase.",
        "Mgbe nkebi a gasịrị, anyị ga-ajụ ajụjụ dị mfe iji lelee nghọta gị."
      ],
      question: {
        q: "Gịnị ka GitHub Pages na-arụ na webụsaịtị GitHub na Supabase?",
        options: [
          "O na-ebuga faịlụ dị ka HTML, CSS, na JavaScript",
          "O na-ehichapụ data ndị ọrụ niile",
          "O na-ekesa paswọọdụ nzuzo n'ihu ọha"
        ],
        answer: 0,
        explain: "Ọ dị mma! GitHub Pages na-ebuga faịlụ ihu, ebe Supabase na-edobe data na nbanye."
      }
    },
    yo: {
      pill: "1. GitHub + Supabase",
      title: "Apá 1: GitHub Pages + Supabase",
      subtitle: "Ìgbékalẹ̀ ojú-òpó pẹ̀lú ìwọlé àti tábìlì dátà lórí íńtánẹ́ẹ̀tì",
      bullets: [
        "GitHub Pages ń gbé ojú-òpó jáde (HTML, CSS, JS).",
        "Supabase ń ṣàkóso ìwọlé àti àwọn tábìlì dátà.",
        "Ó rọrùn láti bẹ̀rẹ̀ láìsí sáfà tó wúwo."
      ],
      lines: [
        "Káàbọ̀ sí webinar lekkxygold tutor. Gbogbo ẹ̀kọ́ jẹ́ ìṣẹ́jú márùn-ún. Nínú Apá kìíní, GitHub Pages ń gbé fáìlì ojú-òpó jáde nígbà tí Supabase ń tọ́jú ìwọlé àti dátà.",
        "Fojú inú wò ó pé GitHub dà bí iwájú ìfihàn, tí Supabase sì dà bí ibi ìpamọ́ dátà.",
        "Wo àwòrán webinar náà láti rí bí ẹ̀rọ aṣàwárí ṣe ń mú ojú-òpó wá tí ó sì ń bá Supabase ṣiṣẹ́.",
        "Lẹ́yìn apá yìí, a óò béèrè ìbéèrè kúkúrú láti ṣàyẹ̀wò òye rẹ."
      ],
      question: {
        q: "Kí ni iṣẹ́ GitHub Pages nínú ojú-òpó wẹ́ẹ̀bù GitHub àti Supabase?",
        options: [
          "Ó ń gbé àwọn fáìlì bíi HTML, CSS, àti JavaScript jáde",
          "Ó ń pa gbogbo dátà run",
          "Ó ń fi kọ́kọ́rọ́ ìkọ̀kọ̀ sínú HTML gbangba"
        ],
        answer: 0,
        explain: "Ó tọ̀nà! GitHub Pages ń gbé fáìlì jáde, nígbà tí Supabase ń tọ́jú ìwọlé àti dátà."
      }
    }
  },
  {
    id: 2,
    visual: "architecture",
    en: {
      pill: "2. Keys & Trust",
      title: "Part 2: Architecture & Secret Keys",
      subtitle: "Browser code is visible—protect secret credentials",
      bullets: [
        "Browser downloads front-end code and calls Supabase.",
        "Visitors can inspect front-end code in any browser.",
        "Never place service_role secret keys in browser JS."
      ],
      lines: [
        "Welcome to Part 2 of our webinar. Remember that any code running inside a web browser can be inspected by users.",
        "Only place your public Supabase anon key in front-end code, and never expose private service_role keys.",
        "Keep secret credentials safely on protected servers, never in public client files.",
        "Next, we will answer a quick question on keeping API keys safe."
      ],
      question: {
        q: "Which key must NEVER be placed inside public browser JavaScript?",
        options: [
          "The private service_role key",
          "A webpage heading text",
          "A button background color"
        ],
        answer: 0,
        explain: "Correct! Never expose private or service_role keys inside browser code."
      }
    },
    ig: {
      pill: "2. Igodo & Nchekwa",
      title: "Nkebi 2: Nhazi Sistemụ & Igodo Nzuzo",
      subtitle: "A na-ahụ koodu braụza—chebe igodo nzuzo",
      bullets: [
        "Braụza na-ebuga koodu ma kpọtụrụ Supabase.",
        "Ndị mmadụ nwere ike ile koodu dị na braụza.",
        "Egbula service_role key na koodu braụza."
      ],
      lines: [
        "Nnọọ na Nkebi nke abụọ nke webinar anyị. Cheta na onye ọ bụla nwere ike ịhụ koodu dị na braụza.",
        "Jiri naanị anon key n'ihu webụsaịtị, ma e debela service_role key nzuzo n'ime braụza.",
        "Debe ihe nzuzo n'ebe e chebere nke ọma, ọ bụghị na braụza ọha.",
        "Mgbe nkebi a gachara, anyị ga-aza ajụjụ banyere nchekwa igodo."
      ],
      question: {
        q: "Olee igodo a na-ekwesịghị itinye na koodu JavaScript dị na braụza?",
        options: [
          "Igodo nzuzo service_role key",
          "Aha isiokwu peeji",
          "Agba bọtịnụ"
        ],
        answer: 0,
        explain: "Ọ dị mma! Egbula service_role key na koodu braụza."
      }
    },
    yo: {
      pill: "2. Kọ́kọ́rọ́ & Ààbò",
      title: "Apá 2: Ìṣètò Ètò & Kọ́kọ́rọ́ Àṣírí",
      subtitle: "A lè rí kọ́òdù ẹ̀rọ aṣàwárí—dáàbò bo àṣírí",
      bullets: [
        "Ẹ̀rọ aṣàwárí ń mú kọ́òdù wá tí ó sì ń pe Supabase.",
        "Àwọn àlejò lè wo kọ́òdù nínú ẹ̀rọ aṣàwárí.",
        "Má ṣe fi service_role key sínú JS ẹ̀rọ aṣàwárí."
      ],
      lines: [
        "Káàbọ̀ sí Apá kejì webinar wa. Máa rántí pé kọ́òdù tí ń ṣiṣẹ́ nínú ẹ̀rọ aṣàwárí ṣeé wò fún ẹnikẹ́ni.",
        "Lo anon key gbangba nìkan nínú kọ́òdù ojú-òpó, má sì ṣe fi service_role key àṣírí sínú braụza.",
        "Tọ́jú àwọn kọ́kọ́rọ́ àṣírí sí ibi ààbò tó dájú.",
        "Lẹ́yìn apá yìí, a óò dáhùn ìbéèrè nípa ààbò kọ́kọ́rọ́."
      ],
      question: {
        q: "Kọ́kọ́rọ́ wo ni kò gbọdọ̀ wà nínú kọ́òdù JavaScript tí gbogbo ènìyàn lè rí?",
        options: [
          "Kọ́kọ́rọ́ àṣírí service_role key",
          "Ọ̀rọ̀ àkọlé ojú-òpó",
          "Àwọ̀ bọ́tìnì"
        ],
        answer: 0,
        explain: "Ó tọ̀nà! Má ṣe fi service_role key sínú kọ́òdù ẹ̀rọ aṣàwárí."
      }
    }
  },
  {
    id: 3,
    visual: "structure",
    en: {
      pill: "3. Code Structure",
      title: "Part 3: Clean Code & Table Structure",
      subtitle: "Separate login views, helpers, and history tables",
      bullets: [
        "Keep login screen separate from main dashboard.",
        "Separate display helpers from Supabase queries.",
        "Use clear tables like profiles and transactions."
      ],
      lines: [
        "Welcome to Part 3. Clean structure makes your webinar project easy to understand, maintain, and scale.",
        "Keep the sign-in screen separate from the main dashboard so users enter cleanly after authentication.",
        "Separate display helpers from database calls, and log actions in tables with timestamps.",
        "Let us move to the Part 3 webinar question next."
      ],
      question: {
        q: "Why keep login screens separate from the main dashboard?",
        options: [
          "It keeps access clear and organized until the user signs in",
          "It deletes CSS styles automatically",
          "It stops users from logging in"
        ],
        answer: 0,
        explain: "Correct! Separating login and dashboard views keeps the user flow clean."
      }
    },
    ig: {
      pill: "3. Nhazi Koodu",
      title: "Nkebi 3: Nhazi Koodu & Tebụl Data",
      subtitle: "Kewaa ihu nbanye, ngosipụta, na ndekọ data",
      bullets: [
        "Kewaa peeji nbanye pụọ na dashbọọdụ.",
        "Kewaa ihe na-egosi ihu pụọ na oku database.",
        "Debe tebụl profiles na transactions nwere oge."
      ],
      lines: [
        "Nnọọ na Nkebi nke atọ. Ezi nhazi na-eme ka ọrụ dị mfe ịghọta na idozi.",
        "Debe peeji nbanye iche pụọ na dashbọọdụ ka usoro nbanye dị ọcha.",
        "Kewaa ihe na-egosi ihu pụọ na oku data, ma dekọọ ihe mere nwere oge.",
        "Ajụjụ Nkebi nke atọ na-esote ozugbo."
      ],
      question: {
        q: "Gịnị mere e ji ekewa peeji nbanye pụọ na dashbọọdụ?",
        options: [
          "O na-eme ka usoro dị ọcha ma hazie nke ọma tupu nbanye",
          "O na-ehichapụ agba webụsaịtị",
          "O na-egbochi mmadụ ịbanye"
        ],
        answer: 0,
        explain: "Ọ dị mma! Ikewa ihu nbanye na dashbọọdụ na-eme ka usoro dị mfe ịhazi."
      }
    },
    yo: {
      pill: "3. Ìṣètò Kóòdù",
      title: "Apá 3: Ìṣètò Kóòdù & Tábìlì Dátà",
      subtitle: "Ya ojú-ìwé ìwọlé, ìrànlọ́wọ́, àti tábìlì ìtàn sọ́tọ̀",
      bullets: [
        "Ya ojú-ìwé ìwọlé sọ́tọ̀ kúrò nínú pẹpẹ àkọ́kọ́.",
        "Ya ìfihàn ojú-òpó sọ́tọ̀ kúrò nínú ìpè dátà.",
        "Lo tábìlì profiles àti transactions pẹ̀lú àkókò."
      ],
      lines: [
        "Káàbọ̀ sí Apá kẹta. Ìṣètò tó dára ń mú kí iṣẹ́ rọrùn láti yé àti láti ṣàtúnṣe.",
        "Ya ojú-ìwé ìwọlé sọ́tọ̀ kúrò nínú pẹpẹ àkọ́kọ́ kí ìwọlé lè wà ní ètò.",
        "Ya ìfihàn sọ́tọ̀ kúrò nínú ìpè dátà, kí o sì kọ àwọn ìṣẹ̀lẹ̀ pẹ̀lú àkókò.",
        "Ìbéèrè Apá kẹta ń bọ̀ lẹ́sẹ̀kẹsẹ̀."
      ],
      question: {
        q: "Kí ló dé tí a fi ń ya ojú-ìwé ìwọlé sọ́tọ̀ kúrò nínú pẹpẹ àkọ́kọ́?",
        options: [
          "Ó ń mú kí ìṣàn ètò wà ní ètò àti mímọ́ ṣáájú ìwọlé",
          "Ó ń pa CSS run láìfọwọ́sí",
          "Ó ń dí olùlò lọ́wọ́ láti wọlé"
        ],
        answer: 0,
        explain: "Ó tọ̀nà! Pínpín ojú-ìwé ìwọlé àti pẹpẹ sọ́tọ̀ ń mú kí ètò wà ní àlàáfíà."
      }
    }
  },
  {
    id: 4,
    visual: "security",
    en: {
      pill: "4. Row Security",
      title: "Part 4: Row Level Security (RLS)",
      subtitle: "Protect database rows and keep sensitive logic safe",
      bullets: [
        "Enable Row Level Security (RLS) on every table.",
        "Use auth.uid() policies so users access own rows.",
        "Keep critical balance and reward rules server-side."
      ],
      lines: [
        "Welcome to Part 4. Row Level Security—or RLS—protects rows inside your PostgreSQL tables.",
        "Policies using auth.uid() keep each user's records isolated from other users.",
        "For real money or rewards in production apps, handle critical rules server-side.",
        "Let us check your knowledge with the Part 4 question."
      ],
      question: {
        q: "What does Row Level Security (RLS) do in Supabase?",
        options: [
          "Restricts database row access using policies like auth.uid()",
          "Changes font sizes on mobile screens",
          "Disables HTTPS connections"
        ],
        answer: 0,
        explain: "Correct! RLS enforces policies on database rows so users only access permitted rows."
      }
    },
    ig: {
      pill: "4. Nchekwa Ahịrị",
      title: "Nkebi 4: Row Level Security (RLS)",
      subtitle: "Chebe ahịrị data ma debe iwu dị mkpa n'udo",
      bullets: [
        "Mụnye RLS na tebụl data gị niile.",
        "Jiri iwu auth.uid() ichebe data onye ọ bụla.",
        "Debe mgbanwe ego na onyinye dị mkpa n'akụkụ sava."
      ],
      lines: [
        "Nnọọ na Nkebi nke anọ. Row Level Security ma ọ bụ RLS na-echebe ahịrị data na PostgreSQL.",
        "Iwu na-eji auth.uid() na-eme ka data onye ọ bụla dị iche site na nke ndị ọzọ.",
        "Maka ego ma ọ bụ onyinye dị mkpa, debe iwu nchekwa n'akụkụ sava.",
        "Ka anyị lelee nghọta gị na ajụjụ Nkebi nke anọ."
      ],
      question: {
        q: "Gịnị ka Row Level Security (RLS) na-eme na Supabase?",
        options: [
          "O na-echebe nnweta ahịrị data site na iwu dị ka auth.uid()",
          "O na-agbanwe nha mkpụrụ akwụkwọ",
          "O na-ewepụ nchekwa HTTPS"
        ],
        answer: 0,
        explain: "Ọ dị mma! RLS na-echebe ahịrị data site na iwu nchekwa."
      }
    },
    yo: {
      pill: "4. Ààbò Ìlà",
      title: "Apá 4: Row Level Security (RLS)",
      subtitle: "Dáàbò bo ìlà dátà kí olùlò kan rí dátà tirẹ̀ nìkan",
      bullets: [
        "Mú RLS ṣiṣẹ́ lórí gbogbo tábìlì dátà rẹ.",
        "Lo ìlànà auth.uid() láti dáàbò bo dátà olùlò kọ̀ọ̀kan.",
        "Fi ìṣirò owó àti ẹ̀bùn pàtàkì sí apá sáfà."
      ],
      lines: [
        "Káàbọ̀ sí Apá kẹrin. Row Level Security tàbí RLS ń dáàbò bo àwọn ìlà dátà nínú Supabase.",
        "Ìlànà tí ó ń lo auth.uid() ń rí i dájú pé olùlò kan ń rí tàbí ṣàtúnṣe dátà tirẹ̀ nìkan.",
        "Fún owó gidi tàbí ẹ̀bùn, tọ́jú àwọn ìṣirò pàtàkì sí apá sáfà.",
        "Ẹ jẹ́ ká ṣàyẹ̀wò òye rẹ nínú ìbéèrè Apá kẹrin."
      ],
      question: {
        q: "Kí ni Row Level Security (RLS) ń ṣe nínú Supabase?",
        options: [
          "Ó ń dènà wíwọlé sí ìlà dátà láì ní àṣẹ nípasẹ̀ auth.uid()",
          "Ó ń yí ìwọ̀n lẹ́tà padà",
          "Ó ń pa HTTPS run"
        ],
        answer: 0,
        explain: "Ó tọ̀nà! RLS ń dáàbò bo ìlà dátà nípasẹ̀ àwọn ìlànà ààbò."
      }
    }
  },
  {
    id: 5,
    visual: "laws",
    en: {
      pill: "5. Laws & Ethics",
      title: "Part 5: Laws, Privacy & Ethics",
      subtitle: "Follow platform rules, protect personal info, and label demos",
      bullets: [
        "Follow GitHub and Supabase terms; avoid deceptive sites.",
        "Protect personal data like phone numbers, emails, and bank info.",
        "Clearly label financial/investment demos as educational practice."
      ],
      lines: [
        "Welcome to Part 5, the closing part of our 5-minute webinar. Always follow GitHub and Supabase terms.",
        "Respect data privacy laws when handling phone numbers, emails, or bank information.",
        "Clearly label financial or investment practice projects as educational demos.",
        "Thank you for joining lekkxygold tutor! Answer the final question to wrap up."
      ],
      question: {
        q: "How should a practice financial or investment page be labeled?",
        options: [
          "Clearly labeled as an educational or simulated demo",
          "Presented as an unauthorized real bank",
          "Built with no care for user privacy"
        ],
        answer: 0,
        explain: "Correct! Clearly labeling educational demos as practice keeps users informed and follows ethical rules."
      }
    },
    ig: {
      pill: "5. Iwu & Omume",
      title: "Nkebi 5: Iwu, Nzuzo Data & Ezi Omume",
      subtitle: "Soro iwu ikpo okwu, chebe data mmadụ, ma kọwaa ihe ngosi",
      bullets: [
        "Soro usoro GitHub na Supabase; emela ihe aghụghọ.",
        "Chebe nọmba ekwentị, email, na akụkọ ụlọ akụ mmadụ.",
        "Kọwaa nke ọma na ihe ngosi ego bụ maka mmụta."
      ],
      lines: [
        "Nnọọ na Nkebi nke ise, nke bụ nkebi ikpeazụ nke webinar nkeji ise. Soro usoro GitHub na Supabase mgbe niile.",
        "Chebe nzuzo mgbe ị na-anakọta nọmba ekwentị, email, ma ọ bụ nkọwa ụlọ akụ.",
        "Kọwaa na ihe ngosi ego bụ maka mmụta.",
        "Daalụ maka isonye na lekkxygold tutor! Zaa ajụjụ ikpeazụ iji mechaa."
      ],
      question: {
        q: "Olee otú e kwesịrị isi gosi peeji ego e mere maka mmụta?",
        options: [
          "Kọwaa ya nke ọma dị ka ihe mmụta ma ọ bụ nlele",
          "Kwuo na ọ bụ ụlọ akụ gọọmentị na-enweghị ikike",
          "Leghara nzuzo data mmadụ anya"
        ],
        answer: 0,
        explain: "Ọ dị mma! Ikọwa nke ọma na ọ bụ ihe mmụta na-echebe ndị mmadụ."
      }
    },
    yo: {
      pill: "5. Òfin & Ìwà",
      title: "Apá 5: Òfin, Ìpamọ́ Dátà & Ìwà Rere",
      subtitle: "Tẹ̀lé òfin pẹpẹ, dáàbò bo dátà ara ẹni, kí o sì ṣe àfihàn kedere",
      bullets: [
        "Tẹ̀lé òfin GitHub àti Supabase; má ṣe ojú-òpó ẹ̀tàn.",
        "Dáàbò bo nọ́ńbà fóònù, ímeèlì, àti àkọsílẹ̀ bánkì.",
        "Fi hàn kedere pé àfihàn ìṣúná fún ìdánilẹ́kọ̀ọ́ ni."
      ],
      lines: [
        "Káàbọ̀ sí Apá karùn-ún, apá ìkẹyìn webinar ìṣẹ́jú márùn-ún wa. Máa tẹ̀lé òfin GitHub àti Supabase.",
        "Bọ̀wọ̀ fún ààbò dátà nígbà tí o bá ń gba nọ́ńbà fóònù, ímeèlì, tàbí àlàyé bánkì.",
        "Fi hàn gbangba pé àfihàn ìṣúná fún ìdánilẹ́kọ̀ọ́ ni.",
        "A dúpẹ́ fún kíkópa nínú lekkxygold tutor! Dáhùn ìbéèrè ìkẹyìn láti parí."
      ],
      question: {
        q: "Báwo ni a ṣe yẹ kí a ṣe àfihàn ojú-òpó ìṣúná tí a ṣe fún ìdánilẹ́kọ̀ọ́?",
        options: [
          "Kí a fi hàn kedere pé ìdánilẹ́kọ̀ọ́ tàbí àfihàn ni",
          "Kí a sọ pé bánkì gidi ni láì ní àṣẹ",
          "Kí a ṣàì dáàbò bo dátà olùlò"
        ],
        answer: 0,
        explain: "Ó dára púpọ̀! Fífi hàn kedere pé ìdánilẹ́kọ̀ọ́ ni ń dáàbò bo àwọn ènìyàn."
      }
    }
  }
];

let currentPartIndex = 0;
let currentLang = "en";
let isPlaying = false;
let isPaused = false;
let isQuizOpen = false;
let quizAnswered = false;

let totalElapsedSec = 0;
let lastFrameTime = performance.now();
let lastLineSlot = -1;
let availableVoices = [];

function formatTime(sec) {
  const safe = Math.max(0, Math.min(TOTAL_WEBINAR_SEC, Math.floor(sec)));
  const m = String(Math.floor(safe / 60)).padStart(2, "0");
  const s = String(safe % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function getCurrentLineText() {
  const lines = PARTS[currentPartIndex][currentLang].lines;
  const partElapsed = totalElapsedSec - currentPartIndex * PART_DURATION_SEC;
  const idx = Math.max(0, Math.floor(partElapsed / LINE_INTERVAL_SEC)) % lines.length;
  return lines[idx];
}

function scoreVoice(voice, lang) {
  let score = 0;
  const name = (voice.name || "").toLowerCase();
  const vLang = (voice.lang || "").toLowerCase();

  if (vLang.startsWith(lang)) score += 50;
  if (lang === "en" && vLang.includes("ng")) score += 20;
  if (lang === "en" && (vLang.includes("gb") || vLang.includes("us"))) score += 10;

  // Prefer natural/neural/enhanced voices when available
  if (name.includes("natural") || name.includes("neural") || name.includes("online") || name.includes("enhanced")) {
    score += 25;
  }
  return score;
}

function populateVoices() {
  if (!("speechSynthesis" in window)) return;
  try {
    availableVoices = window.speechSynthesis.getVoices() || [];
    voiceSelect.innerHTML = "";

    if (!availableVoices.length) {
      const opt = document.createElement("option");
      opt.textContent = "Default Speaker Voice";
      opt.value = "";
      voiceSelect.appendChild(opt);
      return;
    }

    let bestIdx = 0;
    let bestScore = -1;

    availableVoices.forEach((v, i) => {
      const opt = document.createElement("option");
      opt.textContent = `${v.name} (${v.lang})`;
      opt.value = String(i);
      voiceSelect.appendChild(opt);

      const s = scoreVoice(v, currentLang);
      if (s > bestScore) {
        bestScore = s;
        bestIdx = i;
      }
    });

    voiceSelect.value = String(bestIdx);
  } catch (_) {}
}

populateVoices();
if ("speechSynthesis" in window && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

function speakText(text) {
  readerText.textContent = text;
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const idx = parseInt(voiceSelect.value, 10);
    if (!Number.isNaN(idx) && availableVoices[idx]) {
      utter.voice = availableVoices[idx];
    }
    const rateVal = parseFloat(paceSelect.value);
    utter.rate = Number.isNaN(rateVal) ? 0.92 : rateVal;
    utter.pitch = 1.02;
    window.speechSynthesis.speak(utter);
  } catch (_) {}
}

function renderPartPills() {
  partPills.innerHTML = "";
  PARTS.forEach((p, idx) => {
    const btn = document.createElement("button");
    btn.className = "part-pill" + (idx === currentPartIndex ? " active" : "");
    btn.textContent = p[currentLang].pill;
    btn.addEventListener("click", () => {
      goToPart(idx, isPlaying && !isPaused);
    });
    partPills.appendChild(btn);
  });
}

function syncUI() {
  const t = LABELS[currentLang];
  playBtn.textContent = t.play;
  pauseBtn.textContent = isPaused ? t.resume : t.pause;
  speakBtn.textContent = t.speak;
  prevBtn.textContent = t.prev;
  nextBtn.textContent = t.next;
  restartBtn.textContent = t.restart;
  quizBtn.textContent = t.quiz;
  readerLabel.textContent = t.readerLabel;
  footerNote.textContent = t.note;

  partCounter.textContent = `${t.part} ${currentPartIndex + 1} / ${PARTS.length}`;
  const remaining = Math.max(0, TOTAL_WEBINAR_SEC - Math.floor(totalElapsedSec));
  totalTimerText.textContent = `${formatTime(remaining)} / 05:00`;

  playBtn.disabled = isPlaying && !isPaused && !isQuizOpen;
  pauseBtn.disabled = !isPlaying;
  prevBtn.disabled = currentPartIndex === 0;
  nextBtn.disabled = currentPartIndex === PARTS.length - 1;

  renderPartPills();

  if (!isQuizOpen) {
    readerText.textContent = getCurrentLineText();
  }
}

function openQuiz() {
  isQuizOpen = true;
  quizAnswered = false;
  if ("speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch (_) {}
  }

  const t = LABELS[currentLang];
  const qData = PARTS[currentPartIndex][currentLang].question;

  quizBox.classList.remove("hidden");
  quizTag.textContent = `${t.quizTag} ${currentPartIndex + 1} / ${PARTS.length}`;
  quizQ.textContent = qData.q;
  quizAns.textContent = "";
  nextPartBtn.style.display = "none";
  quizOpts.innerHTML = "";

  qData.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAnswer(idx));
    quizOpts.appendChild(btn);
  });

  syncUI();
  speakText(qData.q);
}

function handleAnswer(selectedIdx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const t = LABELS[currentLang];
  const qData = PARTS[currentPartIndex][currentLang].question;
  const optionButtons = quizOpts.querySelectorAll(".opt-btn");

  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === qData.answer) btn.classList.add("correct");
    else if (idx === selectedIdx && selectedIdx !== qData.answer) btn.classList.add("wrong");
  });

  quizAns.textContent = qData.explain;
  nextPartBtn.style.display = "inline-block";
  nextPartBtn.textContent =
    currentPartIndex < PARTS.length - 1 ? t.nextPart : t.finishAll;

  speakText(qData.explain);
}

function goToPart(index, shouldPlay) {
  currentPartIndex = Math.max(0, Math.min(index, PARTS.length - 1));
  totalElapsedSec = currentPartIndex * PART_DURATION_SEC;
  lastLineSlot = -1;
  lastFrameTime = performance.now();
  isQuizOpen = false;
  quizAnswered = false;
  quizBox.classList.add("hidden");

  if ("speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch (_) {}
  }

  isPlaying = Boolean(shouldPlay);
  isPaused = false;
  syncUI();

  if (isPlaying) {
    lastLineSlot = Math.floor(totalElapsedSec / LINE_INTERVAL_SEC);
    speakText(getCurrentLineText());
  }
}

function fillRoundRect(x, y, w, h, r, fillColor, strokeColor) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
}

function drawWrappedText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currY);
      line = words[i];
      currY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currY);
  }
}

function drawPresenterAndWaveform(cx, cy, tSec, speakingActive) {
  const bob = speakingActive ? Math.sin(tSec * 5.5) * 3 : 0;
  const mouthOpen = speakingActive ? Math.abs(Math.sin(tSec * 9.5)) * 7 + 2 : 2;

  // Presenter ring & avatar
  ctx.strokeStyle = speakingActive ? "#f5d061" : "#64748b";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(cx, cy + bob, 34, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.arc(cx, cy + bob, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx - 10, cy - 6 + bob, 3.8, 0, Math.PI * 2);
  ctx.arc(cx + 10, cy - 6 + bob, 3.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f5d061";
  ctx.beginPath();
  ctx.ellipse(cx, cy + 10 + bob, 8, mouthOpen / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Live audio bars next to presenter
  const bars = 5;
  for (let i = 0; i < bars; i++) {
    const amp = speakingActive
      ? 8 + Math.abs(Math.sin(tSec * 8 + i * 1.1)) * 22
      : 6;
    const bx = cx - 86 + i * 9;
    const by = cy - amp / 2;
    ctx.fillStyle = speakingActive ? "#38bdf8" : "#475569";
    ctx.fillRect(bx, by, 5, amp);
  }
}

function drawWebinarSlideVisual(visualType, tSec) {
  const bx = 770;
  const by = 175;
  const bw = 450;
  const bh = 415;

  fillRoundRect(bx, by, bw, bh, 18, "rgba(17, 24, 39, 0.95)", "rgba(245, 208, 97, 0.4)");

  ctx.fillStyle = "#fde68a";
  ctx.font = "bold 18px system-ui, sans-serif";
  ctx.fillText("WEBINAR VISUAL STAGE", bx + 24, by + 38);

  const pulse = 0.5 + 0.5 * Math.sin(tSec * 4);

  if (visualType === "hosting" || visualType === "architecture") {
    fillRoundRect(bx + 28, by + 65, 394, 78, 12, "#090e1a", "#38bdf8");
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText("1. Attendee Browser", bx + 46, by + 98);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "15px system-ui, sans-serif";
    ctx.fillText("Loads UI & auth session", bx + 46, by + 124);

    const dotX = bx + 80 + ((tSec * 130) % 240);
    ctx.fillStyle = "#f5d061";
    ctx.beginPath();
    ctx.arc(dotX, by + 160, 7, 0, Math.PI * 2);
    ctx.fill();

    fillRoundRect(bx + 28, by + 176, 394, 78, 12, "#090e1a", "#f5d061");
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText("2. GitHub Pages", bx + 46, by + 209);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "15px system-ui, sans-serif";
    ctx.fillText("Delivers HTML, CSS & JS", bx + 46, by + 235);

    fillRoundRect(
      bx + 28,
      by + 288,
      394,
      86,
      12,
      "#090e1a",
      `rgba(52, 211, 153, ${0.55 + pulse * 0.45})`
    );
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText("3. Supabase Cloud", bx + 46, by + 321);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "15px system-ui, sans-serif";
    ctx.fillText("Auth, Postgres & RLS rules", bx + 46, by + 347);
  } else {
    const cards =
      visualType === "structure"
        ? [
            { top: "Login vs. Dashboard", sub: "Clear view separation", color: "#f5d061" },
            { top: "UI & Data Code", sub: "Clean & maintainable", color: "#38bdf8" },
            { top: "Tables & Dates", sub: "profiles & transactions", color: "#34d399" }
          ]
        : visualType === "security"
        ? [
            { top: "Row Level Security", sub: "Protects user rows", color: "#f87171" },
            { top: "Public Anon Key", sub: "Never leak secret keys", color: "#f5d061" },
            { top: "Server Rules", sub: "Protect critical logic", color: "#34d399" }
          ]
        : [
            { top: "Platform Rules", sub: "Follow GitHub & Supabase", color: "#f5d061" },
            { top: "Data Privacy", sub: "Phone, email & bank care", color: "#38bdf8" },
            { top: "Educational Notice", sub: "Label practice apps clearly", color: "#c084fc" }
          ];

    cards.forEach((c, idx) => {
      const yPos = by + 68 + idx * 106;
      const shift = Math.sin(tSec * 2.5 + idx) * 4;
      fillRoundRect(bx + 28 + shift, yPos, 394, 84, 12, "#090e1a", c.color);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px system-ui, sans-serif";
      ctx.fillText(c.top, bx + 46 + shift, yPos + 34);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "15px system-ui, sans-serif";
      ctx.fillText(c.sub, bx + 46 + shift, yPos + 62);
    });
  }
}

function render(now) {
  const dt = Math.min(0.25, (now - lastFrameTime) / 1000);
  lastFrameTime = now;

  if (isPlaying && !isPaused && !isQuizOpen) {
    totalElapsedSec = Math.min(TOTAL_WEBINAR_SEC, totalElapsedSec + dt);

    const partEndSec = (currentPartIndex + 1) * PART_DURATION_SEC;
    if (totalElapsedSec >= partEndSec) {
      totalElapsedSec = partEndSec;
      openQuiz();
    } else {
      const slot = Math.floor(totalElapsedSec / LINE_INTERVAL_SEC);
      if (slot !== lastLineSlot) {
        lastLineSlot = slot;
        const line = getCurrentLineText();
        readerText.textContent = line;
        speakText(line);
      }
      const remaining = Math.max(0, TOTAL_WEBINAR_SEC - Math.floor(totalElapsedSec));
      totalTimerText.textContent = `${formatTime(remaining)} / 05:00`;
    }
  }

  const partObj = PARTS[currentPartIndex];
  const langObj = partObj[currentLang];
  const speakingNow = isPlaying && !isPaused && !isQuizOpen;

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, "#080b14");
  bg.addColorStop(1, "#131a2c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const remaining = Math.max(0, TOTAL_WEBINAR_SEC - Math.floor(totalElapsedSec));
  ctx.fillStyle = "#f5d061";
  ctx.font = "bold 18px system-ui, sans-serif";
  ctx.fillText(
    `LEKKXYGOLD TUTOR WEBINAR • ${currentLang.toUpperCase()} • ${formatTime(remaining)} LEFT (5:00)`,
    56,
    56
  );

  drawPresenterAndWaveform(1180, 64, totalElapsedSec, speakingNow);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px system-ui, sans-serif";
  ctx.fillText(langObj.title, 56, 118);

  ctx.fillStyle = "#fde68a";
  ctx.font = "22px system-ui, sans-serif";
  ctx.fillText(langObj.subtitle, 56, 152);

  fillRoundRect(56, 175, 685, 415, 18, "rgba(15, 23, 42, 0.88)", "rgba(255, 255, 255, 0.14)");

  langObj.bullets.forEach((bText, i) => {
    const yBase = 235 + i * 110;
    const bounce = speakingNow ? Math.sin(totalElapsedSec * 3 + i) * 3 : 0;

    ctx.fillStyle = "#f5d061";
    ctx.beginPath();
    ctx.arc(92, yBase - 6 + bounce, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 23px system-ui, sans-serif";
    drawWrappedText(bText, 116, yBase + bounce, 595, 29);
  });

  drawWebinarSlideVisual(partObj.visual, totalElapsedSec);

  const ratio = totalElapsedSec / TOTAL_WEBINAR_SEC;
  fillRoundRect(56, 606, 1164, 12, 6, "rgba(255, 255, 255, 0.1)", null);
  fillRoundRect(56, 606, Math.max(10, 1164 * ratio), 12, 6, "#f5d061", null);

  fillRoundRect(56, 628, 1164, 68, 12, "rgba(0, 0, 0, 0.85)", "rgba(245, 208, 97, 0.35)");
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px system-ui, sans-serif";
  const caption = isQuizOpen ? `❓ ${langObj.question.q}` : getCurrentLineText();
  drawWrappedText(caption, 76, 656, 1124, 24);

  requestAnimationFrame(render);
}

playBtn.addEventListener("click", () => {
  if (isQuizOpen) {
    isQuizOpen = false;
    quizBox.classList.add("hidden");
  }
  if (isPaused) {
    isPaused = false;
    isPlaying = true;
    lastFrameTime = performance.now();
    syncUI();
    speakText(getCurrentLineText());
    return;
  }
  isPlaying = true;
  isPaused = false;
  lastFrameTime = performance.now();
  lastLineSlot = Math.floor(totalElapsedSec / LINE_INTERVAL_SEC);
  syncUI();
  speakText(getCurrentLineText());
});

pauseBtn.addEventListener("click", () => {
  if (!isPlaying) return;
  if (!isPaused) {
    isPaused = true;
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
    }
  } else {
    isPaused = false;
    lastFrameTime = performance.now();
    if (!isQuizOpen) speakText(getCurrentLineText());
  }
  syncUI();
});

speakBtn.addEventListener("click", () => {
  if (isQuizOpen) {
    speakText(PARTS[currentPartIndex][currentLang].question.q);
  } else {
    speakText(getCurrentLineText());
  }
});

prevBtn.addEventListener("click", () => {
  goToPart(currentPartIndex - 1, isPlaying && !isPaused);
});

nextBtn.addEventListener("click", () => {
  goToPart(currentPartIndex + 1, isPlaying && !isPaused);
});

restartBtn.addEventListener("click", () => {
  totalElapsedSec = 0;
  goToPart(0, true);
});

quizBtn.addEventListener("click", () => {
  openQuiz();
});

nextPartBtn.addEventListener("click", () => {
  if (currentPartIndex < PARTS.length - 1) {
    goToPart(currentPartIndex + 1, true);
  } else {
    totalElapsedSec = 0;
    goToPart(0, true);
  }
});

langSelect.addEventListener("change", () => {
  currentLang = langSelect.value;
  populateVoices();
  syncUI();
  if (isQuizOpen) {
    openQuiz();
  } else if (isPlaying && !isPaused) {
    speakText(getCurrentLineText());
  }
});

paceSelect.addEventListener("change", () => {
  if (isPlaying && !isPaused && !isQuizOpen) {
    speakText(getCurrentLineText());
  }
});

syncUI();
requestAnimationFrame(render);
