const canvas = document.getElementById("lessonCanvas");
const ctx = canvas.getContext("2d");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const recordBtn = document.getElementById("recordBtn");
const voiceSelect = document.getElementById("voiceSelect");
const sceneCounter = document.getElementById("sceneCounter");
const statusNote = document.getElementById("statusNote");

const SCENES = [
  {
    title: "1. Static Hosting + Backend-as-a-Service",
    subtitle: "How GitHub Pages and Supabase power modern web apps",
    diagram: "flow",
    points: [
      "GitHub Pages serves fast static files: HTML, CSS, and JavaScript.",
      "Supabase provides Auth, PostgreSQL database, and APIs over HTTPS.",
      "No custom backend server is required to launch static projects."
    ],
    narration:
      "Welcome to lekkxygold tutor. Today we are covering how to build a static web application using GitHub and Supabase. GitHub delivers your visual front-end files, while Supabase handles user accounts and database storage."
  },
  {
    title: "2. System Architecture & Trust Boundary",
    subtitle: "Browser -> GitHub CDN -> Supabase Auth & PostgreSQL",
    diagram: "arch",
    points: [
      "Users load index.html from GitHub and sign in through Supabase.",
      "The browser is an untrusted client; front-end code is public.",
      "Never expose private or service_role keys in browser scripts."
    ],
    narration:
      "In this architecture, the user's browser loads your site from GitHub and connects directly to Supabase. Because anyone can inspect browser code, never put secret keys inside your front-end JavaScript."
  },
  {
    title: "3. Structural Notes: Code & Database",
    subtitle: "Clean separation of views, UI helpers, and relational tables",
    diagram: "structure",
    points: [
      "Keep login screens separated from authenticated app dashboards.",
      "Separate UI rendering from Supabase queries and formatting helpers.",
      "Use relational tables like profiles and transactions with timestamps."
    ],
    narration:
      "Structurally, separate your login view from your main platform view. Keep UI logic and database calls organized, and use structured tables with timestamps so every record is clear and traceable."
  },
  {
    title: "4. Row Level Security (RLS) & Server Rules",
    subtitle: "Protecting user rows and sensitive application logic",
    diagram: "security",
    points: [
      "Enable Row Level Security on every table so users only see own rows.",
      "Enforce access rules with auth.uid() policies in PostgreSQL.",
      "Move critical balance or reward logic server-side for production."
    ],
    narration:
      "Row Level Security acts as your database bodyguard. Always enable RLS so users cannot access or alter another user's records, and keep sensitive business logic protected on the server side."
  },
  {
    title: "5. Laws, Privacy & Tutor Guidelines",
    subtitle: "Responsible engineering, data protection, and compliance",
    diagram: "compliance",
    points: [
      "Follow GitHub and Supabase terms; avoid deceptive or abusive apps.",
      "Protect personal data such as phone numbers, emails, and bank details.",
      "Label financial or investment demos clearly for educational use."
    ],
    narration:
      "Finally, always follow platform guidelines, respect data privacy laws when handling personal details like phone numbers or bank accounts, and clearly mark educational financial demos as simulations."
  }
];

let currentSceneIndex = 0;
let isPlaying = false;
let isPaused = false;
let animFrameId = null;
let sceneStartTime = performance.now();
let availableVoices = [];

let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

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

  availableVoices.forEach((voice, idx) => {
    const opt = document.createElement("option");
    opt.textContent = `${voice.name} (${voice.lang})`;
    opt.value = String(idx);
    if (voice.lang.toLowerCase().startsWith("en")) {
      opt.selected = true;
    }
    voiceSelect.appendChild(opt);
  });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

function stopSpeech() {
  window.speechSynthesis.cancel();
}

function speakCurrentScene(onComplete) {
  stopSpeech();
  const scene = SCENES[currentSceneIndex];

  if (!("speechSynthesis" in window)) {
    setTimeout(() => {
      if (isPlaying && !isPaused && onComplete) onComplete();
    }, 5500);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(scene.narration);
  const selectedIndex = parseInt(voiceSelect.value, 10);
  if (!Number.isNaN(selectedIndex) && availableVoices[selectedIndex]) {
    utterance.voice = availableVoices[selectedIndex];
  }
  utterance.rate = 0.98;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (isPlaying && !isPaused && onComplete) {
      onComplete();
    }
  };

  utterance.onerror = () => {
    if (isPlaying && !isPaused && onComplete) {
      onComplete();
    }
  };

  window.speechSynthesis.speak(utterance);
}

function startScene(index, autoAdvance = true) {
  currentSceneIndex = Math.max(0, Math.min(index, SCENES.length - 1));
  sceneStartTime = performance.now();
  sceneCounter.textContent = `Scene ${currentSceneIndex + 1} / ${SCENES.length}`;

  if (isPlaying && !isPaused) {
    speakCurrentScene(() => {
      if (!autoAdvance) return;
      if (currentSceneIndex < SCENES.length - 1) {
        startScene(currentSceneIndex + 1, true);
      } else {
        isPlaying = false;
        updateButtons();
        stopRecordingIfActive();
        statusNote.textContent = "lekkxygold tutor video finished.";
      }
    });
  }
}

function updateButtons() {
  playBtn.disabled = isPlaying && !isPaused;
  pauseBtn.disabled = !isPlaying;
  pauseBtn.textContent = isPaused ? "▶ Resume" : "⏸ Pause";
  prevBtn.disabled = currentSceneIndex === 0;
  nextBtn.disabled = currentSceneIndex === SCENES.length - 1;
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

function drawVisualPanel(type, elapsedSec) {
  const px = 770;
  const py = 175;
  const pw = 450;
  const ph = 420;

  drawRoundedBox(px, py, pw, ph, 18, "rgba(18, 22, 34, 0.92)", "rgba(212, 175, 55, 0.3)");

  const pulse = 0.5 + 0.5 * Math.sin(elapsedSec * 3);

  ctx.fillStyle = "#f5d061";
  ctx.font = "bold 18px system-ui, sans-serif";
  ctx.fillText("ARCHITECTURAL DIAGRAM", px + 24, py + 38);

  if (type === "flow" || type === "arch") {
    drawRoundedBox(px + 30, py + 70, 390, 72, 12, "#0b101b", "#38bdf8");
    ctx.fillStyle = "#e0f2fe";
    ctx.font = "bold 16px system-ui, sans-serif";
    ctx.fillText("1. User Browser (Client)", px + 48, py + 102);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("Renders UI & holds session token", px + 48, py + 125);

    drawRoundedBox(px + 30, py + 178, 390, 72, 12, "#0b101b", "#f5d061");
    ctx.fillStyle = "#fef3c7";
    ctx.font = "bold 16px system-ui, sans-serif";
    ctx.fillText("2. GitHub Pages (Static Host)", px + 48, py + 210);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("Delivers index.html, CSS & JS", px + 48, py + 233);

    drawRoundedBox(px + 30, py + 286, 390, 86, 12, "#0b101b", `rgba(52, 211, 153, ${0.55 + pulse * 0.45})`);
    ctx.fillStyle = "#d1fae5";
    ctx.font = "bold 16px system-ui, sans-serif";
    ctx.fillText("3. Supabase (Auth + Postgres)", px + 48, py + 318);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("Enforces RLS policies & stores data", px + 48, py + 342);
  } else {
    const blocks =
      type === "structure"
        ? [
            { label: "Auth Gate", desc: "Hide app until logged in", color: "#f5d061" },
            { label: "UI + Data Modules", desc: "Clean & maintainable code", color: "#38bdf8" },
            { label: "Relational Tables", desc: "profiles + transactions", color: "#34d399" }
          ]
        : type === "security"
        ? [
            { label: "Row Level Security", desc: "auth.uid() row isolation", color: "#f87171" },
            { label: "Anon Key Only", desc: "Never expose service_role", color: "#f5d061" },
            { label: "Server Logic", desc: "Protect balances & rewards", color: "#34d399" }
          ]
        : [
            { label: "Platform Terms", desc: "GitHub & Supabase rules", color: "#f5d061" },
            { label: "Privacy Laws", desc: "Protect phone, email, bank", color: "#38bdf8" },
            { label: "Educational Notice", desc: "Mark demos as simulations", color: "#c084fc" }
          ];

    blocks.forEach((b, i) => {
      const by = py + 72 + i * 106;
      drawRoundedBox(px + 30, by, 390, 82, 12, "#0b101b", b.color);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 17px system-ui, sans-serif";
      ctx.fillText(b.label, px + 48, by + 34);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "14px system-ui, sans-serif";
      ctx.fillText(b.desc, px + 48, by + 60);
    });
  }
}

function renderFrame(now) {
  const elapsedSec = (now - sceneStartTime) / 1000;
  const scene = SCENES[currentSceneIndex];

  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#090c14");
  grad.addColorStop(1, "#141927");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f5d061";
  ctx.font = "bold 16px system-ui, sans-serif";
  ctx.fillText("LEKKXYGOLD TUTOR • GITHUB + SUPABASE", 60, 62);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "15px system-ui, sans-serif";
  ctx.fillText(`Part ${currentSceneIndex + 1} of ${SCENES.length}`, canvas.width - 150, 62);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px system-ui, sans-serif";
  ctx.fillText(scene.title, 60, 122);

  ctx.fillStyle = "#d4af37";
  ctx.font = "20px system-ui, sans-serif";
  ctx.fillText(scene.subtitle, 60, 156);

  drawRoundedBox(60, 175, 680, 420, 18, "rgba(15, 23, 42, 0.78)", "rgba(255, 255, 255, 0.1)");

  scene.points.forEach((pt, idx) => {
    const reveal = Math.min(1, Math.max(0, (elapsedSec - idx * 0.45) * 2.5));
    ctx.save();
    ctx.globalAlpha = reveal;
    const yPos = 235 + idx * 105;

    ctx.fillStyle = "#f5d061";
    ctx.beginPath();
    ctx.arc(96, yPos - 6, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f1f5f9";
    ctx.font = "21px system-ui, sans-serif";
    ctx.fillText(pt, 120, yPos);
    ctx.restore();
  });

  drawVisualPanel(scene.diagram, elapsedSec);

  drawRoundedBox(60, 622, 1160, 68, 12, "rgba(0, 0, 0, 0.75)", "rgba(212, 175, 55, 0.25)");
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "16px system-ui, sans-serif";
  const captionText = isPlaying && !isPaused ? `🔊 ${scene.narration}` : `⏸ ${scene.narration}`;
  ctx.fillText(captionText.slice(0, 118) + (captionText.length > 118 ? "..." : ""), 82, 663);

  animFrameId = requestAnimationFrame(renderFrame);
}

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
      a.download = "lekkxygold-tutor-github-supabase.webm";
      a.click();
      URL.revokeObjectURL(url);
      statusNote.textContent = "Video downloaded as lekkxygold-tutor-github-supabase.webm";
    };

    mediaRecorder.start();
    isRecording = true;
    recordBtn.textContent = "⏹ Stop & Save Video";
    statusNote.textContent = "Recording canvas video...";

    if (!isPlaying) {
      isPlaying = true;
      isPaused = false;
      updateButtons();
      startScene(0, true);
    }
  } else {
    stopRecordingIfActive();
  }
}

function stopRecordingIfActive() {
  if (isRecording && mediaRecorder && mediaRecorder.state !== "inactive") {
    isRecording = false;
    recordBtn.textContent = "⏺ Record Video File";
    mediaRecorder.stop();
  }
}

playBtn.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
    isPlaying = true;
    window.speechSynthesis.resume();
    updateButtons();
    startScene(currentSceneIndex, true);
    return;
  }
  isPlaying = true;
  isPaused = false;
  updateButtons();
  startScene(currentSceneIndex, true);
});

pauseBtn.addEventListener("click", () => {
  if (!isPlaying) return;
  if (!isPaused) {
    isPaused = true;
    window.speechSynthesis.pause();
    updateButtons();
  } else {
    isPaused = false;
    window.speechSynthesis.resume();
    updateButtons();
  }
});

prevBtn.addEventListener("click", () => {
  const wasPlaying = isPlaying && !isPaused;
  isPlaying = wasPlaying;
  isPaused = false;
  updateButtons();
  startScene(currentSceneIndex - 1, true);
});

nextBtn.addEventListener("click", () => {
  const wasPlaying = isPlaying && !isPaused;
  isPlaying = wasPlaying;
  isPaused = false;
  updateButtons();
  startScene(currentSceneIndex + 1, true);
});

restartBtn.addEventListener("click", () => {
  isPlaying = true;
  isPaused = false;
  updateButtons();
  startScene(0, true);
});

recordBtn.addEventListener("click", toggleRecording);

updateButtons();
startScene(0, false);
animFrameId = requestAnimationFrame(renderFrame);
