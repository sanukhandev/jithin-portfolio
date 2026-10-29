import { ApproachStage } from "@/types/content";

export const approachStages: ApproachStage[] = [
  {
    step: "01",
    title: {
      en: "Discover",
      it: "Scoperta",
      ar: "الاستكشاف",
    },
    subtitle: {
      en: "Context qualification and friction mapping",
      it: "Qualificazione del contesto e mappatura delle inefficienze",
      ar: "تحديد السياق ورسم خرائط نقاط الاختناق",
    },
    description: {
      en: "Examine core operational flows and domain bottlenecks through systemic diagnostic inquiry. We identify where intelligent automation delivers authentic competitive advantage versus superficial novelty.",
      it: "Esame dei flussi operativi e dei colli di bottiglia aziendali mediante diagnosi sistemica. Identifichiamo dove l'automazione intelligente offre un reale vantaggio competitivo rispetto a novità superficiali.",
      ar: "دراسة مسارات العمل الأساسية ونقاط الاختناق التشغيلية عبر تشخيص منهجي متكامل. نحدد بدقة أين يحقق الذكاء الاصطناعي ميزة تنافسية حقيقية بدلاً من الحلول الشكلية.",
    },
    inputs: {
      en: "Workflow telemetry, executive strategy, domain interviews, historical data samples",
      it: "Telemetria dei flussi di lavoro, strategia direzionale, interviste agli esperti, campioni di dati storici",
      ar: "بيانات تدفق العمليات، الاستراتيجية التنفيذية، مقابلات خبراء المجال، عينات البيانات التاريخية",
    },
    outputs: {
      en: "Opportunity qualification register, high-level feasibility report, data readiness scorecard",
      it: "Registro di qualificazione delle opportunità, studio di fattibilità preliminare, scorecard di prontezza dei dati",
      ar: "سجل تأهيل الفرص، تقرير الجدوى الأولي، بطاقة قياس جاهزية البيانات",
    },
    decisionGate: {
      en: "Strategic relevance and demonstrable economic return before exploratory code is written.",
      it: "Rilevanza strategica e ritorno economico dimostrabile prima di scrivere qualsiasi codice esplorativo.",
      ar: "الملاءمة الاستراتيجية والعائد الاقتصادي القابل للإثبات قبل كتابة أي كود استكشافي.",
    },
  },
  {
    step: "02",
    title: {
      en: "Validate",
      it: "Validazione",
      ar: "التحقق والتقييم",
    },
    subtitle: {
      en: "Hypothesis testing and boundary verification",
      it: "Test delle ipotesi e verifica dei confini operativi",
      ar: "اختبار الفرضيات والتحقق من حدود الأمان",
    },
    description: {
      en: "Build disciplined technical proof-of-concepts against authentic enterprise constraints. We evaluate model behavior, hallucination boundaries, latency, and data sensitivity in isolated sandboxes.",
      it: "Sviluppo di proof-of-concept mirati a fronte di vincoli aziendali reali. Valutiamo comportamento dei modelli, rischio di allucinazione, latenza e sensibilità dei dati in ambienti isolati.",
      ar: "بناء نماذج إثبات مفهوم تقنية منضبطة في ظل قيود بيئة العمل الحقيقية. نختبر سلوك النماذج، ودقة الإجابات، وزمن الاستجابة، وحساسية البيانات في بيئات معزولة.",
    },
    inputs: {
      en: "Sanitized domain datasets, evaluation rubrics, target latency/cost thresholds",
      it: "Dataset sanitizzati, criteri di valutazione, soglie prestabilite di latenza e costo",
      ar: "مجموعات بيانات منقحة، معايير تقييم محددة، عتبات مستهدفة للتكلفة وسرعة الاستجابة",
    },
    outputs: {
      en: "Empirical evaluation benchmarks, accuracy matrix, security and compliance risk review",
      it: "Benchmark di valutazione empirica, matrice di accuratezza, analisi dei rischi di sicurezza e conformità",
      ar: "مؤشرات تقييم تجريبية، مصفوفة الدقة والموثوقية، مراجعة مخاطر الأمان والامتثال",
    },
    decisionGate: {
      en: "Accuracy and safety thresholds met under adversarial edge cases.",
      it: "Raggiungimento delle soglie di accuratezza e sicurezza anche in casi limite avversari.",
      ar: "تحقيق عتبات الدقة والأمان في مواجهة الحالات القصوى والمعقدة.",
    },
  },
  {
    step: "03",
    title: {
      en: "Design",
      it: "Progettazione",
      ar: "التصميم المعماري",
    },
    subtitle: {
      en: "Systems architecture and governance blueprinting",
      it: "Architettura dei sistemi e definizione delle regole di governance",
      ar: "هندسة النظم وتصميم أطر الحوكمة",
    },
    description: {
      en: "Architect resilient multi-agent orchestration, human-in-the-loop review queues, and strict telemetry. Systems are specified for auditability, versioned model routing, and graceful degradation.",
      it: "Progettazione di orchestrazioni multi-agente resilienti, code di revisione con supervisione umana e telemetria avanzata. I sistemi sono strutturati per verificabilità e degradazione controllata.",
      ar: "تصميم بنية تنسيق متينة للوكلاء متعددي المهام، وقوائم مراجعة بشرية محكمة، ومراقبة شاملة. تُصمم الأنظمة لضمان قابلية التدقيق وتوجيه النماذج والتراجع الآمن.",
    },
    inputs: {
      en: "Validation benchmarks, integration topologies, enterprise RBAC/compliance policies",
      it: "Benchmark di validazione, topologie di integrazione, policy aziendali RBAC e di conformità",
      ar: "مؤشرات التحقق المعتمدة، مخططات التكامل التقني، سياسات الصلاحيات والامتثال المؤسسي",
    },
    outputs: {
      en: "Production technical architecture, API/event schemas, governance playbook, fallback policies",
      it: "Architettura tecnica di produzione, schemi API/eventi, playbook di governance, policy di fallback",
      ar: "المعمارية التقنية للإنتاج، مخططات الواجهات والأحداث، دليل الحوكمة، سياسات التعامل مع الطوارئ",
    },
    decisionGate: {
      en: "Architectural and security review sign-off with clear failure-mode containment.",
      it: "Approvazione della revisione architetturale e di sicurezza con contenimento garantito dei guasti.",
      ar: "اعتماد المراجعة المعمارية والأمنية مع خطة شاملة لاحتواء حالات الفشل المحتملة.",
    },
  },
  {
    step: "04",
    title: {
      en: "Scale",
      it: "Scalabilità",
      ar: "التوسع والتمكين",
    },
    subtitle: {
      en: "Production deployment and operational compounding",
      it: "Distribuzione in produzione e consolidamento operativo",
      ar: "الإطلاق المؤسسي ومضاعفة الأثر التشغيلي",
    },
    description: {
      en: "Deploy to mission-critical infrastructure with phased rollout cohorts. We implement automated feedback loops, inference cost optimization, and ongoing drift monitoring to compound institutional value.",
      it: "Rilascio in infrastrutture mission-critical con distribuzione graduale per gruppi di utenti. Implementiamo feedback loop automatici, ottimizzazione dei costi e monitoraggio continuo della deviazione.",
      ar: "النشر عبر البنية التحتية الحيوية من خلال مراحل تدريجية مدروسة. نطبق حلقات تغذية راجعة آلية، وترشيد تكاليف التشغيل، ومراقبة مستمرة لانحراف النماذج لتعزيز القيمة المؤسسية.",
    },
    inputs: {
      en: "Production environment, enterprise identity systems, rollout schedule, monitoring infrastructure",
      it: "Ambiente di produzione, sistemi di identità aziendali, piano di rilascio, infrastruttura di monitoraggio",
      ar: "بيئة الإنتاج المعتمدة، أنظمة الهوية المؤسسية، جدول الإطلاق، بنية المراقبة التشغيلية",
    },
    outputs: {
      en: "Operational telemetry dashboards, automated model monitoring, organizational capability playbook",
      it: "Dashboard di telemetria operativa, monitoraggio automatizzato dei modelli, playbook di competenze",
      ar: "لوحات مؤشرات تشغيلية حية، مراقبة آلية لأداء النماذج، أدلة تمكين القدرات المؤسسية",
    },
    decisionGate: {
      en: "Sustained operational SLOs, cost predictability, and organizational adoption metrics.",
      it: "Mantenimento dei livelli di servizio (SLO), prevedibilità dei costi e adozione effettiva.",
      ar: "استدامة معايير جودة الخدمة (SLO)، واستقرار التكاليف، وتحقيق مؤشرات التبني المؤسسي.",
    },
  },
];
