const canvas = document.getElementById("lessonCanvas");
const ctx = canvas.getContext("2d");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const quizNowBtn = document.getElementById("quizNowBtn");
const recordBtn = document.getElementById("recordBtn");
const langSelect = document.getElementById("langSelect");
const voiceSelect = document.getElementById("voiceSelect");
const sceneCounter = document.getElementById("sceneCounter");
const timerDisplay = document.getElementById("timerDisplay");
const statusNote = document.getElementById("statusNote");

const quizPanel = document.getElementById("quizPanel");
const quizHeader = document.getElementById("quizHeader");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const continueNextBtn = document.getElementById("continueNextBtn");

// Max 5 minutes (300 seconds) per lesson number
const MAX_LESSON_SECONDS = 300;

const UI_LABELS = {
  en: {
    play: "▶ Play Lesson",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    prev: "⏮ Prev No.",
    next: "Next No. ⏭",
    restart: "↺ Restart No.",
    quizBtn: "❓ Questions",
    record: "⏺ Record Video",
    stopRecord: "⏹ Stop & Save",
    counterPrefix: "Number",
    quizHeader: "Question After Number",
    nextNumberBtn: "Continue to Next Number →",
    finishAllBtn: "Finish All 5 Numbers (Replay No. 1)",
    diagramTitle: "SIMPLE STUDENT DIAGRAM",
    readyNote: "Choose English, Igbo, or Yoruba and press Play Lesson. Each number runs up to 5 minutes, followed by questions."
  },
  ig: {
    play: "▶ Kpọọ Nkuzi",
    pause: "⏸ Kwụsị Nwa Oge",
    resume: "▶ Gaa N'ihu",
    prev: "⏮ Nọmba Azụ",
    next: "Nọmba Ọzọ ⏭",
    restart: "↺ Malite Ọzọ",
    quizBtn: "❓ Ajụjụ",
    record: "⏺ Dee Vidio",
    stopRecord: "⏹ Kwụsị & Chekwaa",
    counterPrefix: "Nọmba",
    quizHeader: "Ajụjụ Mgbe Nọmba Gachara",
    nextNumberBtn: "Gaa N'ihu na Nọmba Ọzọ →",
    finishAllBtn: "Mechaa Nọmba 5 (Malite na Nọmba 1)",
    diagramTitle: "ESERE NKA NKE DỊ MFE",
    readyNote: "Họrọ Bekee, Igbo, ma ọ bụ Yoruba wee pịa Kpọọ Nkuzi. Nọmba ọ bụla ruru nkeji ise, e nweekwara ajụjụ mgbe o gasịrị."
  },
  yo: {
    play: "▶ Ṣí Ẹ̀kọ́",
    pause: "⏸ Dádúró Díẹ̀",
    resume: "▶ Tẹ̀síwájú",
    prev: "⏮ Nọ́ńbà Tẹ́lẹ̀",
    next: "Nọ́ńbà Kàn ⏭",
    restart: "↺ Bẹ̀rẹ̀ Lẹ́ẹ̀kan Sí i",
    quizBtn: "❓ Àwọn Ìbéèrè",
    record: "⏺ Gba Fídíò",
    stopRecord: "⏹ Dádúró & Fi Pamọ́",
    counterPrefix: "Nọ́ńbà",
    quizHeader: "Ìbéèrè Lẹ́yìn Nọ́ńbà",
    nextNumberBtn: "Tẹ̀síwájú sí Nọ́ńbà Kàn →",
    finishAllBtn: "Parí Gbogbo Nọ́ńbà 5 (Bẹ̀rẹ̀ Nọ́ńbà 1)",
    diagramTitle: "ÀWÒRÁN RỌRÙN FÚN AKẸ́KỌ̀Ọ́",
    readyNote: "Yan Èdè Gẹ̀ẹ́sì, Igbo, tàbí Yorùbá kí o tẹ Ṣí Ẹ̀kọ́. Nọ́ńbà kọ̀ọ̀kan tó ìṣẹ́jú márùn-ún pẹ̀lú ìbéèrè lẹ́yìn náà."
  }
};

const LESSONS = [
  {
    number: 1,
    diagram: "hosting",
    en: {
      title: "1. GitHub + Supabase: Simple Picture",
      subtitle: "How a static website works without a heavy server",
      points: [
        "GitHub Pages shows your website pages (HTML, CSS, JS).",
        "Supabase saves users, logins, and database rows safely.",
        "Great for fast learning projects and student apps."
      ],
      segments: [
        "Welcome to lekkxygold tutor in English. In Number 1, let us make this super simple for every student. Imagine you open a shop on the internet. GitHub is like your clean shop front and display shelf where visitors see your page. Supabase is like the back room and record book where accounts and saved data are kept.",
        "Because GitHub Pages serves static files like HTML, CSS, and JavaScript, you do not need to manage a complicated server yourself. Meanwhile, Supabase gives you ready-made login and database tools.",
        "Take your time looking at the diagram. Notice how the student browser talks to GitHub for the page design, and talks to Supabase for login and stored information."
      ],
      question: {
        q: "In a GitHub + Supabase static website, what is the main role of GitHub Pages?",
        options: [
          "Serving static front-end files like HTML, CSS, and JavaScript",
          "Replacing all database tables with passwords",
          "Hiding secret server passwords inside public code"
        ],
        answer: 0,
        explain: "Correct! GitHub Pages hosts and serves your static front-end files, while Supabase handles auth and database storage."
      }
    },
    ig: {
      title: "1. GitHub + Supabase: Nkọwa Dị Mfe",
      subtitle: "Otu webụsaịtị na-adịghị mkpa sava dị arọ si arụ ọrụ",
      points: [
        "GitHub Pages na-egosi ihu webụsaịtị gị (HTML, CSS, JS).",
        "Supabase na-edobe ndị ọrụ, nbanye, na data n'ụzọ nchekwa.",
        "Ọ dị mma maka ụmụ akwụkwọ na mmụta ngwa ngwa."
      ],
      segments: [
        "Nnọọ na nkuzi lekkxygold tutor n'asụsụ Igbo. Na Nọmba nke mbụ, ka anyị mee ka o doo ụmụ akwụkwọ anya nke ọma. Chee na i mepere ụlọ ahịa n'ịntanetị. GitHub dị ka ihu ụlọ ahịa na-egosi ngwaahịa, ebe Supabase dị ka ụlọ ndebe akwụkwọ na-edekọ ihe niile.",
        "Ebe ọ bụ na GitHub Pages na-ebuga faịlụ ndị dị ka HTML, CSS, na JavaScript, i chọghị ịrụ sava siri ike n'onwe gị. Supabase na-enyekwara gị nbanye ndị ọrụ na ebe nchekwa data.",
        "Lelee eserese ahụ nke ọma. I ga-ahụ ka braụza onye ọrụ si ejikọ na GitHub maka ihu akwụkwọ, ma jikọọ na Supabase maka data."
      ],
      question: {
        q: "Na webụsaịtị GitHub na Supabase, gịnị ka GitHub Pages na-arụkarị?",
        options: [
          "O na-ebuga faịlụ dị ka HTML, CSS, na JavaScript",
          "O na-ekpochapụ data ndị ọrụ niile",
          "O na-edobe paswọọdụ nzuzo n'ihu ọha"
        ],
        answer: 0,
        explain: "Ọ dị mma! GitHub Pages na-ebuga faịlụ webụsaịtị, ebe Supabase na-elekọta nbanye na data."
      }
    },
    yo: {
      title: "1. GitHub + Supabase: Àlàyé Rọrùn",
      subtitle: "Bí ojú-òpó wẹ́ẹ̀bù ṣe ń ṣiṣẹ́ láìsí sáfà tó wúwo",
      points: [
        "GitHub Pages ń fi ojú-òpó wẹ́ẹ̀bù hàn (HTML, CSS, JS).",
        "Supabase ń tọ́jú àwọn olùlò, ìwọlé, àti dátà dáadáa.",
        "Ó dára fún akẹ́kọ̀ọ́ àti ẹ̀kọ́ ìṣe-àgbékalẹ̀."
      ],
      segments: [
        "Káàbọ̀ sí ẹ̀kọ́ lekkxygold tutor ní èdè Yorùbá. Nínú Nọ́ńbà kìíní, ẹ jẹ́ ká mú un rọrùn fún gbogbo akẹ́kọ̀ọ́. Fojú inú wò ó pé o ṣí ilé ìtajà lórí íńtánẹ́ẹ̀tì. GitHub dà bí iwájú ilé ìtajà tí ènìyàn ń rí, nígbà tí Supabase dà bí yàrá ìpamọ́ tí ó ń tọ́jú àkọsílẹ̀.",
        "Nítorí pé GitHub Pages ń gbé àwọn fáìlì bíi HTML, CSS, àti JavaScript jáde, o kò ní láti máa tọ́jú sáfà tó díjú fúnra rẹ. Supabase sì ń pèsè ìwọlé àti ibi ìpamọ́ dátà.",
        "Wò àwòrán náà dáadáa. O máa rí bí ẹ̀rọ aṣàwárí olùlò ṣe ń lo GitHub fún ìrísí ojú-òpó, tí ó sì ń lo Supabase fún dátà."
      ],
      question: {
        q: "Nínú ojú-òpó wẹ́ẹ̀bù GitHub àti Supabase, kí ni iṣẹ́ pàtàkì GitHub Pages?",
        options: [
          "Gbigbé àwọn fáìlì bíi HTML, CSS, àti JavaScript jáde",
          "Pípa gbogbo dátà olùlò run",
          "Fífipamọ́ kọ́kọ́rọ́ ìkọ̀kọ̀ sínú gbangba"
        ],
        answer: 0,
        explain: "Ó tọ̀nà! GitHub Pages ń gbé àwọn fáìlì ojú-òpó jáde, nígbà tí Supabase ń ṣàkóso ìwọlé àti dátà."
      }
    }
  },
  {
    number: 2,
    diagram: "architecture",
    en: {
      title: "2. Architecture & Browser Trust",
      subtitle: "Why front-end code is public and secrets must stay safe",
      points: [
        "Browser loads UI from GitHub and calls Supabase over HTTPS.",
        "Anyone can open DevTools and read front-end HTML/JS.",
        "Use the public anon key safely; never expose service_role keys."
      ],
      segments: [
        "Welcome to Number 2. Here we talk about architecture—how the parts connect. When a student opens your website, their browser downloads your code and sends requests to Supabase.",
        "The golden rule for beginners is this: the browser is not a secret vault. Any visitor can right-click, inspect elements, or read your JavaScript file.",
        "That is why you only put your public Supabase anon key in front-end code, and never put private secret keys inside browser scripts."
      ],
      question: {
        q: "Which key should NEVER be placed inside public browser JavaScript?",
        options: [
          "The private service_role secret key",
          "The normal webpage title text",
          "A CSS button color class"
        ],
        answer: 0,
        explain: "Spot on! Never expose private or service_role keys in front-end code because anyone can inspect browser code."
      }
    },
    ig: {
      title: "2. Nchịkọta Sistemụ & Nchekwa Braụza",
      subtitle: "Gịnị mere koodu ihu ji pụta ìhè na otu e si echekwa ihe nzuzo",
      points: [
        "Braụza na-ebuga ihu site na GitHub ma kpọtụrụ Supabase.",
        "Onye ọ bụla nwere ike ile koodu HTML/JS na braụza.",
        "Jiri anon key nke ọma; egbula service_role key n'ihu ọha."
      ],
      segments: [
        "Nnọọ na Nọmba nke abụọ. Ebe a, anyị na-ekwu banyere otu akụkụ dị iche iche si ejikọ ọnụ. Mgbe mmadụ mepere webụsaịtị gị, braụza ya na-ebuga koodu gị ma na-agwa Supabase okwu.",
        "Iwu dị mkpa maka ụmụ akwụkwọ bụ na braụza abụghị ebe nzuzo. Onye ọ bụla nwere ike ilele koodu JavaScript dị n'ihu webụsaịtị.",
        "N'ihi ya, e debela igodo nzuzo dị ka service_role key n'ime koodu braụza; naanị igodo ọha kwesịrị ekwesị ka a na-eji n'ihu."
      ],
      question: {
        q: "Olee igodo a na-ekwesịghị itinye n'ime koodu JavaScript dị na braụza?",
        options: [
          "Igodo nzuzo service_role key",
          "Aha isiokwu dị n'elu peeji",
          "Agba bọtịnụ na CSS"
        ],
        answer: 0,
        explain: "Ezigbo azịza! Egbula service_role key na braụza n'ihi na ndị mmadụ nwere ike ịhụ koodu ihu."
      }
    },
    yo: {
      title: "2. Ìṣètò Ètò & Ààbò Ẹ̀rọ Aṣàwárí",
      subtitle: "Kí ló dé tí kọ́òdù ojú-òpó fi hàn àti bí a ṣe ń dáàbò bo àṣírí",
      points: [
        "Ẹ̀rọ aṣàwárí ń mú ìrísí wá láti GitHub, ó sì ń pe Supabase.",
        "Ẹnikẹ́ni lè wo kọ́òdù HTML/JS nínú ẹ̀rọ aṣàwárí.",
        "Lo anon key dáadáa; má ṣe fi service_role key sí gbangba."
      ],
      segments: [
        "Káàbọ̀ sí Nọ́ńbà kejì. Níbí, a ń sọ̀rọ̀ nípa bí àwọn ẹ̀yà ara ètò ṣe ń sopọ̀ mọ́ ara wọn. Nígbà tí akẹ́kọ̀ọ́ bá ṣí ojú-òpó rẹ, ẹ̀rọ aṣàwárí rẹ̀ ń gba kọ́òdù wọlé tí ó sì ń bá Supabase sọ̀rọ̀.",
        "Òfin pàtàkì fún àwọn akẹ́kọ̀ọ́ ni pé ẹ̀rọ aṣàwárí kì í ṣe ibi ìpamọ́ àṣírí. Ẹnikẹ́ni lè wo kọ́òdù JavaScript tí ó wà ní ojú-òpó.",
        "Ìdí nìyẹn tí a kò gbọdọ̀ fi kọ́kọ́rọ́ àṣírí bíi service_role key sínú kọ́òdù ẹ̀rọ aṣàwárí."
      ],
      question: {
        q: "Kọ́kọ́rọ́ wo ni kò yẹ kí ó wà nínú kọ́òdù JavaScript tí gbogbo ènìyàn lè rí?",
        options: [
          "Kọ́kọ́rọ́ àṣírí service_role key",
          "Àkọlé ojú-òpó wẹ́ẹ̀bù",
          "Àwọ̀ bọ́tìnì nínú CSS"
        ],
        answer: 0,
        explain: "Ó dára púpọ̀! Má ṣe fi service_role key sínú kọ́òdù ẹ̀rọ aṣàwárí nítorí ẹnikẹ́ni lè yẹ̀ ẹ́ wò."
      }
    }
  },
  {
    number: 3,
    diagram: "structure",
    en: {
      title: "3. Structural Notes: Views & Tables",
      subtitle: "Organizing clean screens, functions, and database tables",
      points: [
        "Separate login screens from the main signed-in dashboard.",
        "Keep UI display helpers separate from database queries.",
        "Use structured tables (profiles, transactions) with timestamps."
      ],
      segments: [
        "Welcome to Number 3. Good structure makes your code easy to read, fix, and teach. First, keep your login or registration view separate from your main app view so users only enter after signing in.",
        "Second, keep your code organized: have clear functions for showing messages or formatting money, and clear functions for talking to Supabase.",
        "Third, design your database tables cleanly—like a profiles table for user details and a transactions table with timestamps so every action has a clear record."
      ],
      question: {
        q: "Why is it good practice to log actions in a transactions table with timestamps?",
        options: [
          "It creates a clear, traceable history of what happened and when",
          "It stops HTML from loading on mobile phones",
          "It removes the need for any user login"
        ],
        answer: 0,
        explain: "Well done! Timestamps and history tables help you track actions clearly and debug issues easily."
      }
    },
    ig: {
      title: "3. Ndozi Ọdịdị: Ihụ Na Tebụl Data",
      subtitle: "Ikwado peeji, ọrụ koodu, na tebụl data n'usoro",
      points: [
        "Kewaa peeji nbanye pụọ na dashbọọdụ onye banyere.",
        "Kewaa ihe na-egosi ihe na ihe na-akpọtụrụ database.",
        "Jiri tebụl data doro anya (profiles, transactions) nwere oge."
      ],
      segments: [
        "Nnọọ na Nọmba nke atọ. Ezi nhazi na-eme ka koodu dị mfe ịghọta na idozi. Nke mbụ, kewaa peeji nbanye pụọ na peeji ime ụlọ ka onye na-abanyeghị ghara ịhụ ihe nzuzo.",
        "Nke abụọ, hazie koodu gị nke ọma: kewaa ihe na-egosi ozi ma ọ bụ gụọ ego pụọ na ihe na-eziga ma ọ bụ na-eweta data na Supabase.",
        "Nke atọ, hazie tebụl data gị nke ọma—dị ka tebụl profiles na tebụl transactions nwere oge ka e wee mara ihe mere na mgbe o mere."
      ],
      question: {
        q: "Gịnị mere o ji dị mma idekọ ihe mere na tebụl transactions nwere oge?",
        options: [
          "O na-enye ndekọ doro anya nke ihe mere na oge o mere",
          "O na-eme ka ekwentị ghara ịgụ HTML",
          "O na-ewepụ mkpa nbanye onye ọrụ"
        ],
        answer: 0,
        explain: "Ọ dị mma! Ndekọ nwere oge na-enyere aka ịhụ ihe mere nke ọma na idozi nsogbu."
      }
    },
    yo: {
      title: "3. Ìṣètò Kóòdù: Àwọn Ojú-Ìwé & Tábìlì Dátà",
      subtitle: "Pínpín ojú-ìwé, iṣẹ́ kóòdù, àti tábìlì dátà lọ́nà tó yéni",
      points: [
        "Ya ojú-ìwé ìwọlé sọ́tọ̀ kúrò nínú pẹpẹ inú ètò.",
        "Ya ìfihàn ojú-ìwé sọ́tọ̀ kúrò nínú ìbéèrè dátà.",
        "Lo tábìlì dátà tó péye (profiles, transactions) pẹ̀lú àkókò."
      ],
      segments: [
        "Káàbọ̀ sí Nọ́ńbà kẹta. Ìṣètò tó dára ń mú kí kóòdù rọrùn láti kà, ṣàtúnṣe, àti kọ́ni. Àkọ́kọ́, ya ojú-ìwé ìwọlé sọ́tọ̀ kúrò nínú pẹpẹ àkọ́kọ́ kí ẹni tí kò tíì wọlé má bàa rí inú ètò.",
        "Ìkejì, tò kóòdù rẹ lọ́nà: ya iṣẹ́ tí ń fi ìròyìn hàn sọ́tọ̀ kúrò nínú iṣẹ́ tí ń bá Supabase gba tàbí fi dátà ránṣẹ́.",
        "Ìkẹta, ṣe àwọn tábìlì dátà dáadáa—bíi tábìlì profiles àti transactions pẹ̀lú àkókò kí a lè rí ohun tí ó ṣẹlẹ̀ àti ìgbà tí ó ṣẹlẹ̀."
      ],
      question: {
        q: "Kí ló dé tí ó fi dára láti kọ àwọn ìṣẹ̀lẹ̀ sínú tábìlì transactions pẹ̀lú àkókò?",
        options: [
          "Ó ń fún wa ní àkọsílẹ̀ tó dájú nípa ohun tí ó ṣẹlẹ̀ àti àkókò rẹ̀",
          "Ó ń dí HTML lọ́wọ́ láti ṣí lórí fóònù",
          "Ó ń mú kí ìwọlé olùlò má ṣe pàtàkì mọ́"
        ],
        answer: 0,
        explain: "Ó tọ̀nà pátápátá! Àkọsílẹ̀ pẹ̀lú àkókò ń ran wa lọ́wọ́ láti tọpinpin àwọn ìṣẹ̀lẹ̀ dáadáa."
      }
    }
  },
  {
    number: 4,
    diagram: "security",
    en: {
      title: "4. Row Level Security (RLS) & Rules",
      subtitle: "Protecting user data and keeping sensitive actions safe",
      points: [
        "Turn on Row Level Security (RLS) on your database tables.",
        "Use policies like auth.uid() = id so users see only their data.",
        "Keep critical balance and reward rules on the server side."
      ],
      segments: [
        "Welcome to Number 4. Imagine a classroom locker where every student has their own key. Row Level Security—or RLS—is the lock on each student's row in PostgreSQL.",
        "Without RLS policies, one signed-in user might try to read or change another user's records. With policies checking auth.uid(), each user stays in their own lane.",
        "Also, for real money or rewards in production apps, put sensitive calculations and balance updates in secure server-side functions rather than trusting only the browser."
      ],
      question: {
        q: "What does Row Level Security (RLS) with auth.uid() help prevent?",
        options: [
          "Users reading or modifying other users' protected rows directly",
          "CSS styles from loading in the browser",
          "Students from asking questions after a lesson"
        ],
        answer: 0,
        explain: "Correct! RLS restricts database rows so users only access the records their policy permits."
      }
    },
    ig: {
      title: "4. Row Level Security (RLS) & Iwu Nchekwa",
      subtitle: "Ichebe data ndị ọrụ na idobe ihe dị mkpa n'udo",
      points: [
        "Mụnye Row Level Security (RLS) na tebụl data gị niile.",
        "Jiri iwu dị ka auth.uid() = id ka onye ọ bụla hụ nke ya.",
        "Debe iwu ego na onyinye dị mkpa n'akụkụ sava."
      ],
      segments: [
        "Nnọọ na Nọmba nke anọ. Chee banyere igbe nchekwa na klaasị ebe nwa akwụkwọ ọ bụla nwere igodo nke ya. Row Level Security—ma ọ bụ RLS—bụ mkpọchi na-echebe ahịrị data ọ bụla na PostgreSQL.",
        "Ọ bụrụ na e nweghị RLS, onye banyere nwere ike ịnwale ịgbanwe data onye ọzọ. Site na auth.uid(), onye ọ bụla na-anọ n'oke nke ya.",
        "Ọzọkwa, maka ezigbo ego ma ọ bụ onyinye na ngwa ndị mmadụ na-eji, debe mgbakọ na mgbanwe ego dị mkpa n'akụkụ sava, ọ bụghị naanị na braụza."
      ],
      question: {
        q: "Gịnị ka Row Level Security (RLS) na auth.uid() na-enyere aka igbochi?",
        options: [
          "Ndị ọrụ ịhụ ma ọ bụ gbanwee data ndị ọrụ ọzọ n'ụzọ na-ezighị ezi",
          "Agba CSS ịdị na peeji",
          "Ụmụ akwụkwọ ịjụ ajụjụ mgbe nkuzi gasịrị"
        ],
        answer: 0,
        explain: "Ezigbo azịza! RLS na-echebe ahịrị data ka onye ọ bụla nweta naanị ihe ikike ya kwere."
      }
    },
    yo: {
      title: "4. Row Level Security (RLS) & Àwọn Òfin Ààbò",
      subtitle: "Dídáàbò bo dátà olùlò àti títọ́jú àwọn ìṣe pàtàkì ní ààbò",
      points: [
        "Mú Row Level Security (RLS) ṣiṣẹ́ lórí àwọn tábìlì dátà rẹ.",
        "Lo ìlànà bíi auth.uid() = id kí olùlò kan rí dátà tirẹ̀ nìkan.",
        "Fi òfin ìṣirò owó àti ẹ̀bùn pàtàkì sí apá sáfà."
      ],
      segments: [
        "Káàbọ̀ sí Nọ́ńbà kẹrin. Fojú inú wò ó pé akẹ́kọ̀ọ́ kọ̀ọ̀kan ní àpótí ìpamọ́ tirẹ̀ pẹ̀lú kọ́kọ́rọ́ tirẹ̀. Row Level Security—tàbí RLS—ni ààbò tí ó ń dáàbò bo ìlà dátà kọ̀ọ̀kan nínú PostgreSQL.",
        "Tí RLS kò bá sí, ẹni tí ó wọlé lè gbìyànjú láti wo tàbí yí dátà ẹlòmíràn padà. Pẹ̀lú auth.uid(), olùlò kọ̀ọ̀kan wà ní àyè tirẹ̀.",
        "Bákan náà, fún owó gidi tàbí ẹ̀bùn nínú ètò gidi, fi àwọn ìṣirò pàtàkì sí apá sáfà kí a má ṣe gbẹ́kẹ̀ lé ẹ̀rọ aṣàwárí nìkan."
      ],
      question: {
        q: "Kí ni Row Level Security (RLS) pẹ̀lú auth.uid() ń ṣe ìrànlọ́wọ́ láti dènà?",
        options: [
          "Kí olùlò má lè wo tàbí yí dátà olùlò mìíràn padà láì ní àṣẹ",
          "Kí CSS má lè ṣiṣẹ́ nínú ẹ̀rọ aṣàwárí",
          "Kí akẹ́kọ̀ọ́ má lè béèrè ìbéèrè lẹ́yìn ẹ̀kọ́"
        ],
        answer: 0,
        explain: "Ó dára gan-an! RLS ń dáàbò bo ìlà dátà kí olùlò kan lè rí ohun tí ìlànà fàyè gbà nìkan."
      }
    }
  },
  {
    number: 5,
    diagram: "compliance",
    en: {
      title: "5. Laws, Privacy & Responsible Use",
      subtitle: "Following platform rules, data privacy, and clear labels",
      points: [
        "Respect GitHub and Supabase rules; never build deceptive sites.",
        "Handle personal info (phone, email, bank) with privacy care.",
        "Clearly label financial/investment demos as educational practice."
      ],
      segments: [
        "Welcome to Number 5, our final lesson number. Great developers follow both code rules and real-world laws. Always follow GitHub and Supabase terms of service and never create misleading or abusive pages.",
        "When an app collects personal details like phone numbers, email addresses, or bank information, data privacy laws require careful protection and honesty with users.",
        "Also, any financial, loan, or investment screen built in class or for a portfolio should be clearly marked as an educational demo—not real licensed banking or financial advice. Great job in lekkxygold tutor!"
      ],
      question: {
        q: "How should a student or tutor present a financial/investment demo built for practice?",
        options: [
          "Clearly label it as an educational or simulated practice project",
          "Claim it is a real licensed bank without authorization",
          "Ignore user privacy when collecting phone numbers"
        ],
        answer: 0,
        explain: "Well done! Clearly marking practice/demo apps as educational protects users and follows ethical and legal guidelines."
      }
    },
    ig: {
      title: "5. Iwu, Nzuzo Data & Ezi Omume",
      subtitle: "Irubere iwu ikpo okwu, nzuzo data, na nkọwa doro anya isi",
      points: [
        "Soro iwu GitHub na Supabase; emela webụsaịtị aghụghọ.",
        "Chebe data mmadụ (ekwentị, email, ụlọ akụ) nke ọma.",
        "Kọwaa n'ụzọ doro anya na ihe ngosi ego bụ maka mmụta."
      ],
      segments: [
        "Nnọọ na Nọmba nke ise, nke bụ nkuzi ikpeazụ anyị. Ezigbo ndị na-eme koodu na-esoro iwu koodu na iwu ụwa. Soro usoro GitHub na Supabase mgbe niile ma emela ihe na-eduhie mmadụ.",
        "Mgbe ngwa na-anakọta nkọwa mmadụ dị ka nọmba ekwentị, email, ma ọ bụ akụkọ ụlọ akụ, iwu nzuzo data chọrọ nchekwa na eziokwu.",
        "Ọzọkwa, ihe ngosi ego ma ọ bụ mbinye ego e mere maka klaasị kwesịrị ịdị pụtara ìhè dị ka ihe mmụta—ọ bụghị ụlọ akụ enyere ikike. Daalụ nke ukwuu na lekkxygold tutor!"
      ],
      question: {
        q: "Olee otú nwa akwụkwọ ma ọ bụ onye nkuzi kwesịrị isi gosi ihe ngosi ego e mere maka mmụta?",
        options: [
          "Kọwaa ya nke ọma dị ka ihe mmụta ma ọ bụ nlele",
          "Kwuo na ọ bụ ụlọ akụ gọọmentị kwadoro n'enweghị ikike",
          "Leghara nzuzo nọmba ekwentị ndị mmadụ anya"
        ],
        answer: 0,
        explain: "Ọ dị mma! Ikọwa nke ọma na ọ bụ ihe mmụta na-echebe ndị mmadụ ma na-agbaso iwu."
      }
    },
    yo: {
      title: "5. Òfin, Ìpamọ́ Dátà & Ìwà Rere",
      subtitle: "Títẹ̀lé òfin pẹpẹ, ààbò dátà, àti àfihàn tó ṣe kedere",
      points: [
        "Bọ̀wọ̀ fún òfin GitHub àti Supabase; má ṣe ojú-òpó ẹ̀tàn.",
        "Tọ́jú dátà ara ẹni (fóònù, ímeèlì, bánkì) pẹ̀lú ààbò tó pọ̀.",
        "Fi hàn gbangba pé àfihàn ìṣúná fún ìdánilẹ́kọ̀ọ́ ni."
      ],
      segments: [
        "Káàbọ̀ sí Nọ́ńbà karùn-ún, èyí tí í ṣe ẹ̀kọ́ ìkẹyìn wa. Àwọn olùṣẹ̀dá kóòdù rere máa ń tẹ̀lé òfin kóòdù àti òfin ayé. Máa tẹ̀lé ìlànà GitHub àti Supabase nígbà gbogbo kí o má sì ṣe ohun ìtànjẹ.",
        "Nígbà tí ètò bá ń gba àlàyé ara ẹni bíi nọ́ńbà fóònù, ímeèlì, tàbí àkọsílẹ̀ bánkì, òfin ààbò dátà béèrè fún ìṣọ́ra àti òtítọ́.",
        "Bákan náà, àfihàn ìṣúná tàbí ìyá owó tí a ṣe fún kíláàsì gbọ́dọ̀ jẹ́ mímọ̀ gẹ́gẹ́ bí àṣà ìdánilẹ́kọ̀ọ́—kì í ṣe bánkì tí a fọwọ́ sí. A kú iṣẹ́ nínú lekkxygold tutor!"
      ],
      question: {
        q: "Báwo ni akẹ́kọ̀ọ́ tàbí olùkọ́ ṣe yẹ kí ó fi àfihàn ìṣúná tí a ṣe fún ìdánilẹ́kọ̀ọ́ hàn?",
        options: [
          "Kí ó fi hàn kedere pé iṣẹ́ ìdánilẹ́kọ̀ọ́ tàbí àfihàn ni",
          "Kí ó sọ pé bánkì gidi ni láì ní àṣẹ ìjọba",
          "Kí ó ṣàì bikita fún ààbò nọ́ńbà fóònù ènìyàn"
        ],
        answer: 0,
        explain: "Ó dára púpọ̀! Fífi hàn kedere pé ìdánilẹ́kọ̀ọ́ ni ń dáàbò bo àwọn ènìyàn tí ó sì ń tẹ̀lé òfin."
      }
    }
  }
];

let currentSceneIndex = 0;
let currentLang = "en";
let isPlaying = false;
let isPaused = false;
let isQuizMode = false;
let quizAnswered = false;
let animFrameId = null;

// Timer tracking (up to 300 seconds = 5:00 per lesson number)
let elapsedLessonSeconds = 0;
let lastTickTime = performance.now();
let speechSegmentIndex = 0;
let availableVoices = [];

// Video recording state
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

function formatTimer(sec) {
  const clamped = Math.max(0, Math.min(MAX_LESSON_SECONDS, Math.floor(sec)));
  const mins = String(Math.floor(clamped / 60)).padStart(2, "0");
  const secs = String(clamped % 60).padStart(2, "0");
  const maxMins = String(Math.floor(MAX_LESSON_SECONDS / 60)).padStart(2, "0");
  return `${mins}:${secs} / ${maxMins}:00`;
}

function getLangPrefix(lang) {
  if (lang === "ig") return "ig";
  if (lang === "yo") return "yo";
  return "en";
}

function populateVoices() {
  availableVoices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";

  if (!availableVoices.length) {
    const opt = document.createElement("option");
    opt.textContent = "Default System Voice";
    opt.value = "";
    voiceSelect.appendChild(opt);
    return;
  }

  const targetPrefix = getLangPrefix(currentLang);
  let bestIdx = 0;

  availableVoices.forEach((voice, idx) => {
    const opt = document.createElement("option");
    opt.textContent = `${voice.name} (${voice.lang})`;
    opt.value = String(idx);
    if (voice.lang.toLowerCase().startsWith(targetPrefix) && bestIdx === 0) {
      bestIdx = idx;
    }
    voiceSelect.appendChild(opt);
  });

  voiceSelect.value = String(bestIdx);
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

function applyLanguageLabels() {
  const lbl = UI_LABELS[currentLang];
  playBtn.textContent = lbl.play;
  pauseBtn.textContent = isPaused ? lbl.resume : lbl.pause;
  prevBtn.textContent = lbl.prev;
  nextBtn.textContent = lbl.next;
  restartBtn.textContent = lbl.restart;
  quizNowBtn.textContent = lbl.quizBtn;
  recordBtn.textContent = isRecording ? lbl.stopRecord : lbl.record;
  sceneCounter.textContent = `${lbl.counterPrefix} ${currentSceneIndex + 1} / ${LESSONS.length}`;
  quizHeader.textContent = lbl.quizHeader;
  if (!isPlaying && elapsedLessonSeconds === 0 && !isQuizMode) {
    statusNote.textContent = lbl.readyNote;
  }
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function speakText(text, onDone) {
  stopSpeech();
  if (!("speechSynthesis" in window)) {
    setTimeout(() => {
      if (onDone) onDone();
    }, 3500);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedIndex = parseInt(voiceSelect.value, 10);
  if (!Number.isNaN(selectedIndex) && availableVoices[selectedIndex]) {
    utterance.voice = availableVoices[selectedIndex];
  }
  if (currentLang === "ig") utterance.lang = "ig-NG";
  else if (currentLang === "yo") utterance.lang = "yo-NG";
  else utterance.lang = "en-NG";

  utterance.rate = 0.96;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onDone) onDone();
  };
  utterance.onerror = () => {
    if (onDone) onDone();
  };

  window.speechSynthesis.speak(utterance);
}

function speakLessonSegment() {
  if (!isPlaying || isPaused || isQuizMode) return;
  const content = LESSONS[currentSceneIndex][currentLang];
  const segments = content.segments;
  const text = segments[speechSegmentIndex % segments.length];

  speakText(text, () => {
    if (!isPlaying || isPaused || isQuizMode) return;
    speechSegmentIndex += 1;
    // Continue speaking segments until the 5-minute timer finishes
    if (elapsedLessonSeconds < MAX_LESSON_SECONDS) {
      speakLessonSegment();
    }
  });
}

function enterQuizMode() {
  isQuizMode = true;
  quizAnswered = false;
  stopSpeech();

  const content = LESSONS[currentSceneIndex][currentLang];
  const lbl = UI_LABELS[currentLang];
  const qData = content.question;

  quizPanel.classList.remove("hidden");
  quizHeader.textContent = `${lbl.quizHeader} ${currentSceneIndex + 1}`;
  quizQuestion.textContent = qData.q;
  quizFeedback.textContent = "";
  continueNextBtn.style.display = "none";
  quizOptions.innerHTML = "";

  qData.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = optText;
    btn.addEventListener("click", () => handleAnswerSelect(idx));
    quizOptions.appendChild(btn);
  });

  if (isPlaying && !isPaused) {
    speakText(`${qData.q}. ${qData.options.join(", ")}`);
  }
}

function handleAnswerSelect(selectedIdx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const content = LESSONS[currentSceneIndex][currentLang];
  const lbl = UI_LABELS[currentLang];
  const qData = content.question;
  const optionButtons = quizOptions.querySelectorAll(".option-btn");

  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === qData.answer) {
      btn.classList.add("correct");
    } else if (idx === selectedIdx && selectedIdx !== qData.answer) {
      btn.classList.add("wrong");
    }
  });

  quizFeedback.textContent = qData.explain;
  continueNextBtn.style.display = "inline-block";
  continueNextBtn.textContent =
    currentSceneIndex < LESSONS.length - 1 ? lbl.nextNumberBtn : lbl.finishAllBtn;

  if (isPlaying && !isPaused) {
    speakText(qData.explain);
  }
}

function loadLessonNumber(index, autoPlay) {
  currentSceneIndex = Math.max(0, Math.min(index, LESSONS.length - 1));
  elapsedLessonSeconds = 0;
  speechSegmentIndex = 0;
  lastTickTime = performance.now();
  isQuizMode = false;
  quizAnswered = false;
  quizPanel.classList.add("hidden");
  stopSpeech();

  applyLanguageLabels();
  timerDisplay.textContent = formatTimer(0);
  updateButtons();

  if (autoPlay) {
    isPlaying = true;
    isPaused = false;
    updateButtons();
    speakLessonSegment();
  }
}

function updateButtons() {
  playBtn.disabled = isPlaying && !isPaused && !isQuizMode;
  pauseBtn.disabled = !isPlaying;
  pauseBtn.textContent = isPaused ? UI_LABELS[currentLang].resume : UI_LABELS[currentLang].pause;
  prevBtn.disabled = currentSceneIndex === 0;
  nextBtn.disabled = currentSceneIndex === LESSONS.length - 1;
}

function drawRoundedBox(x, y, w, h, r, fillStyle, strokeStyle) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawDiagramPanel(type, elapsedSec) {
  const px = 770;
  const py = 175;
  const pw = 450;
  const ph = 420;
  const lbl = UI_LABELS[currentLang];

  drawRoundedBox(px, py, pw, ph, 18, "rgba(18, 22, 34, 0.92)", "rgba(212, 175, 55, 0.3)");

  const pulse = 0.5 + 0.5 * Math.sin(elapsedSec * 3);

  ctx.fillStyle = "#f5d061";
  ctx.font = "bold 17px system-ui, sans-serif";
  ctx.fillText(lbl.diagramTitle, px + 24, py + 38);

  if (type === "hosting" || type === "architecture") {
    drawRoundedBox(px + 30, py + 70, 390, 74, 12, "#0b101b", "#38bdf8");
    ctx.fillStyle = "#e0f2fe";
    ctx.font = "bold 16px system-ui, sans-serif";
    ctx.fillText("1. Student Browser", px + 48, py + 102);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("Displays screen & user session", px + 48, py + 125);

    drawRoundedBox(px + 30, py + 178, 390, 74, 12, "#0b101b", "#f5d061");
    ctx.fillStyle = "#fef3c7";
    ctx.font = "bold 16px system-ui, sans-serif";
    ctx.fillText("2. GitHub Pages", px + 48, py + 210);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("Serves HTML, CSS & JavaScript", px + 48, py + 233);

    drawRoundedBox(px + 30, py + 286, 390, 88, 12, "#0b101b", `rgba(52, 211, 153, ${0.55 + pulse * 0.45})`);
    ctx.fillStyle = "#d1fae5";
    ctx.font = "bold 16px system-ui, sans-serif";
    ctx.fillText("3. Supabase Cloud", px + 48, py + 318);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("Auth, Postgres tables & RLS rules", px + 48, py + 342);
  } else {
    const cards =
      type === "structure"
        ? [
            { top: "Login vs. App View", sub: "Separate screens clearly", color: "#f5d061" },
            { top: "UI vs. Data Code", sub: "Easy to read and maintain", color: "#38bdf8" },
            { top: "Tables + Timestamps", sub: "profiles & transactions", color: "#34d399" }
          ]
        : type === "security"
        ? [
            { top: "Row Level Security", sub: "Protect each user's rows", color: "#f87171" },
            { top: "Safe Public Key", sub: "Never leak secret keys", color: "#f5d061" },
            { top: "Server Validation", sub: "Protect critical actions", color: "#34d399" }
          ]
        : [
            { top: "Platform Guidelines", sub: "Follow GitHub & Supabase", color: "#f5d061" },
            { top: "Privacy Protection", sub: "Phone, email & bank data", color: "#38bdf8" },
            { top: "Clear Demo Label", sub: "Educational practice notice", color: "#c084fc" }
          ];

    cards.forEach((c, idx) => {
      const by = py + 72 + idx * 106;
      drawRoundedBox(px + 30, by, 390, 82, 12, "#0b101b", c.color);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 17px system-ui, sans-serif";
      ctx.fillText(c.top, px + 48, by + 34);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "14px system-ui, sans-serif";
      ctx.fillText(c.sub, px + 48, by + 60);
    });
  }
}

function renderFrame(now) {
  const dt = (now - lastTickTime) / 1000;
  lastTickTime = now;

  if (isPlaying && !isPaused && !isQuizMode) {
    elapsedLessonSeconds = Math.min(MAX_LESSON_SECONDS, elapsedLessonSeconds + dt);
    timerDisplay.textContent = formatTimer(elapsedLessonSeconds);

    if (elapsedLessonSeconds >= MAX_LESSON_SECONDS) {
      enterQuizMode();
    }
  }

  const lesson = LESSONS[currentSceneIndex];
  const content = lesson[currentLang];

  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#090c14");
  grad.addColorStop(1, "#141927");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f5d061";
  ctx.font = "bold 16px system-ui, sans-serif";
  ctx.fillText(
    `LEKKXYGOLD TUTOR • ${currentLang.toUpperCase()} • ${formatTimer(elapsedLessonSeconds)}`,
    60,
    62
  );

  ctx.fillStyle = "#94a3b8";
  ctx.font = "15px system-ui, sans-serif";
  ctx.fillText(`No. ${currentSceneIndex + 1} / ${LESSONS.length}`, canvas.width - 140, 62);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px system-ui, sans-serif";
  ctx.fillText(content.title, 60, 122);

  ctx.fillStyle = "#d4af37";
  ctx.font = "20px system-ui, sans-serif";
  ctx.fillText(content.subtitle, 60, 156);

  drawRoundedBox(60, 175, 680, 420, 18, "rgba(15, 23, 42, 0.78)", "rgba(255, 255, 255, 0.1)");

  content.points.forEach((pt, idx) => {
    const reveal = Math.min(1, Math.max(0, (elapsedLessonSeconds - idx * 0.6) * 2));
    ctx.save();
    ctx.globalAlpha = reveal;
    const yPos = 235 + idx * 105;

    ctx.fillStyle = "#f5d061";
    ctx.beginPath();
    ctx.arc(96, yPos - 6, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f1f5f9";
    ctx.font = "20px system-ui, sans-serif";
    ctx.fillText(pt, 120, yPos);
    ctx.restore();
  });

  drawDiagramPanel(lesson.diagram, elapsedLessonSeconds);

  // Progress bar across bottom
  const progressRatio = elapsedLessonSeconds / MAX_LESSON_SECONDS;
  drawRoundedBox(60, 610, 1160, 10, 5, "rgba(255,255,255,0.08)", null);
  drawRoundedBox(60, 610, Math.max(8, 1160 * progressRatio), 10, 5, "#f5d061", null);

  drawRoundedBox(60, 630, 1160, 62, 12, "rgba(0, 0, 0, 0.78)", "rgba(212, 175, 55, 0.25)");
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "16px system-ui, sans-serif";
  const activeSegment = content.segments[speechSegmentIndex % content.segments.length];
  const prefix = isQuizMode ? "❓ Quiz Ready: " : isPlaying && !isPaused ? "🔊 " : "⏸ ";
  const line = `${prefix}${activeSegment}`;
  ctx.fillText(line.slice(0, 116) + (line.length > 116 ? "..." : ""), 82, 667);

  animFrameId = requestAnimationFrame(renderFrame);
}

// Optional video file recording (.webm)
function toggleRecording() {
  if (!isRecording) {
    if (!canvas.captureStream || typeof MediaRecorder === "undefined") {
      statusNote.textContent = "Video file recording is not supported in this browser.";
      return;
    }

    recordedChunks = [];
    const stream = canvas.captureStream(30);
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lekkxygold-tutor-no${currentSceneIndex + 1}-${currentLang}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      statusNote.textContent = "Saved video file.";
    };

    mediaRecorder.start();
    isRecording = true;
    applyLanguageLabels();
    statusNote.textContent = "Recording lesson canvas...";

    if (!isPlaying) {
      isPlaying = true;
      isPaused = false;
      updateButtons();
      speakLessonSegment();
    }
  } else {
    stopRecordingIfActive();
  }
}

function stopRecordingIfActive() {
  if (isRecording && mediaRecorder && mediaRecorder.state !== "inactive") {
    isRecording = false;
    applyLanguageLabels();
    mediaRecorder.stop();
  }
}

playBtn.addEventListener("click", () => {
  if (isQuizMode) {
    isQuizMode = false;
    quizPanel.classList.add("hidden");
  }
  if (isPaused) {
    isPaused = false;
    isPlaying = true;
    lastTickTime = performance.now();
    if ("speechSynthesis" in window) window.speechSynthesis.resume();
    updateButtons();
    speakLessonSegment();
    return;
  }
  isPlaying = true;
  isPaused = false;
  lastTickTime = performance.now();
  updateButtons();
  speakLessonSegment();
});

pauseBtn.addEventListener("click", () => {
  if (!isPlaying) return;
  if (!isPaused) {
    isPaused = true;
    if ("speechSynthesis" in window) window.speechSynthesis.pause();
    updateButtons();
  } else {
    isPaused = false;
    lastTickTime = performance.now();
    if ("speechSynthesis" in window) window.speechSynthesis.resume();
    updateButtons();
    if (!isQuizMode) speakLessonSegment();
  }
});

prevBtn.addEventListener("click", () => {
  const shouldPlay = isPlaying && !isPaused;
  loadLessonNumber(currentSceneIndex - 1, shouldPlay);
});

nextBtn.addEventListener("click", () => {
  const shouldPlay = isPlaying && !isPaused;
  loadLessonNumber(currentSceneIndex + 1, shouldPlay);
});

restartBtn.addEventListener("click", () => {
  loadLessonNumber(currentSceneIndex, true);
});

quizNowBtn.addEventListener("click", () => {
  enterQuizMode();
});

continueNextBtn.addEventListener("click", () => {
  if (currentSceneIndex < LESSONS.length - 1) {
    loadLessonNumber(currentSceneIndex + 1, true);
  } else {
    loadLessonNumber(0, true);
  }
});

langSelect.addEventListener("change", () => {
  currentLang = langSelect.value;
  populateVoices();
  applyLanguageLabels();

  if (isQuizMode) {
    enterQuizMode();
  } else if (isPlaying && !isPaused) {
    speakLessonSegment();
  }
});

recordBtn.addEventListener("click", toggleRecording);

// Initial setup
applyLanguageLabels();
timerDisplay.textContent = formatTimer(0);
updateButtons();
animFrameId = requestAnimationFrame(renderFrame);
