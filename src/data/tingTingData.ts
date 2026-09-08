import type { CaseRecord, NewsSlide, FinalAction, PolicyStandard } from '../types';

export const APPROVED_LOGO_URL = '/tingting-logo.png';

export const MAYA_AVATAR_URL = '/maya-avatar.png';

export const NEWS_SLIDES: NewsSlide[] = [
  {
    id: 1,
    title: 'Quality: Monthly moderator calibration begins Monday',
    imageUrl: '/tingting-news-01.png',
  },
  {
    id: 2,
    title: 'Operations: APAC review queues move to unified priority routing',
    imageUrl: '/tingting-news-02.png',
  },
  {
    id: 3,
    title: 'Global Operations: Ting Ting Safety Review expands to Dubai',
    imageUrl: '/tingting-news-03.png',
  },
  {
    id: 4,
    title: 'Product Update: New contextual review signals now available',
    imageUrl: '/tingting-news-04.png',
  },
  {
    id: 5,
    title: 'Policy: Policy standards refreshed for September',
    imageUrl: '/tingting-news-05.png',
  },
];

export const INITIAL_CASES: CaseRecord[] = [
  {
    id: 'TT-SG-260905-018427',
    num: '01',
    creator: '@reelcraft.sg',
    policy: 'Physical Risk & Imitation',
    policyId: 'PR-4.2',
    priority: 'Top',
    queueAge: '3m',
    thumbnailUrl: '/case-01-thumb.png',
    videoUrl: '/case-01-video.mp4',
    status: 'Pending',
    caption: 'Weekend rehearsal 🎬 Running through the fight sequence before tomorrow’s shoot.',
    duration: '0:09',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'No Action',
    confidence: '86%',
    detectedSignals: [
      'Blade-like objects',
      'Repeated striking motion',
      'Close-range physical interaction',
    ],
    policyGuidance:
      'Content involving conduct with substantial physical-harm potential may require enforcement. Staged, professional, educational or cultural context may alter the applicable treatment.',
  },
  {
    id: 'TT-SG-260905-018463',
    num: '02',
    creator: '@oddsafterdark',
    policy: 'Harassment & Bullying',
    policyId: 'HB-3.4',
    priority: 'Top',
    queueAge: '8m',
    thumbnailUrl: '/case-02-thumb.png',
    videoUrl: '/case-02-video.mp4',
    status: 'Pending',
    caption: 'Things got out of hand outside campus today.',
    duration: '0:10',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'Remove Content',
    confidence: '88%',
    detectedSignals: [
      'Physical assault',
      'Reciprocal striking',
      'Aggressive confrontation',
    ],
    policyGuidance:
      'Targeted harassment, intimidation and physical aggression may require enforcement depending on severity, context and risk of further harm.',
  },
  {
    id: 'TT-SG-260905-018519',
    num: '03',
    creator: '@classroomcontext',
    policy: 'Physical Risk & Imitation',
    policyId: 'PR-4.2',
    priority: 'Top',
    queueAge: '2h 10m',
    thumbnailUrl: '/case-03-thumb.png',
    videoUrl: '/case-03-video.mp4',
    status: 'Pending',
    caption: 'Late evening run. Nobody was catching us. 🏍️',
    duration: '0:07',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'Remove Content',
    confidence: '93%',
    detectedSignals: [
      'High-speed motorcycle behavior',
      'Public-road racing',
      'No protective equipment',
    ],
    policyGuidance:
      'Content involving dangerous conduct with substantial physical-harm potential may require enforcement, particularly when performed in uncontrolled public environments.',
  },
  {
    id: 'TT-IN-260905-020174',
    num: '04',
    creator: '@ringsidecut',
    policy: 'Shocking & Graphic Content',
    policyId: 'SG-6.3',
    priority: 'Medium',
    queueAge: '4h 35m',
    thumbnailUrl: '/case-04-thumb.png',
    videoUrl: '/case-04-video.mp4',
    status: 'Pending',
    caption: 'Final round. Nobody was backing down.',
    duration: '0:09',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'Age-Gate 18+',
    confidence: '84%',
    detectedSignals: [
      'Repeated powerful physical impact',
      'Visible facial injury',
      'Blood-related visual cue',
    ],
    policyGuidance:
      'Graphic or injury-related material may require restrictions depending on severity, presentation and contextual value.',
  },
  {
    id: 'TT-SG-260905-021308',
    num: '05',
    creator: '@heritage.stage',
    policy: 'Physical Risk & Imitation',
    policyId: 'PR-4.2',
    priority: 'Low',
    queueAge: '15h 05m',
    thumbnailUrl: '/case-05-thumb.png',
    videoUrl: '/case-05-video.mp4',
    status: 'Pending',
    caption: 'Heritage night performance ✨ A tradition passed through generations.',
    duration: '0:10',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'No Action',
    confidence: '84%',
    detectedSignals: [
      'Bladed objects',
      'Coordinated weapon movement',
      'Close-proximity performance',
    ],
    policyGuidance:
      'Staged, professional, educational or cultural context may alter the treatment of content involving potentially dangerous objects or actions.',
  },
  {
    id: 'TT-SG-260905-022441',
    num: '06',
    creator: '@streetwatch.sg',
    policy: 'Shocking & Graphic Content',
    policyId: 'SG-6.3',
    priority: 'Top',
    queueAge: '21m',
    thumbnailUrl: '/case-06-thumb.png',
    videoUrl: '/case-06-video.mp4',
    status: 'Pending',
    caption: 'Accident near the junction. Emergency help is already here.',
    duration: '0:10',
    language: 'English',
    market: 'Singapore',
    queueSource: 'User Report',
    recommendedAction: 'Add Viewer Warning',
    confidence: '82%',
    detectedSignals: [
      'Injured person',
      'Road-collision scene',
      'Visible distress',
    ],
    policyGuidance:
      'Real-world injury content may warrant viewer protection depending on graphic severity, public-interest value and presentation.',
  },
  {
    id: 'TT-IN-260905-023086',
    num: '07',
    creator: '@trackline.rider',
    policy: 'Physical Risk & Imitation',
    policyId: 'PR-4.2',
    priority: 'Medium',
    queueAge: '7h 45m',
    thumbnailUrl: '/case-07-thumb.png',
    videoUrl: '/case-07-video.mp4',
    status: 'Pending',
    caption: 'Closed-track training session. Months of practice behind this one. 🏍️',
    duration: '0:09',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'No Action',
    confidence: '85%',
    detectedSignals: [
      'Motorcycle stunt',
      'Elevated front wheel',
      'High-speed maneuver',
    ],
    policyGuidance:
      'Professional or controlled activity with appropriate safety equipment and contextual signals may receive different treatment from uncontrolled imitation-worthy conduct.',
  },
  {
    id: 'TT-SG-260905-024197',
    num: '08',
    creator: '@afterhours.move',
    policy: 'Body Exposure & Sexualized Behaviors',
    policyId: 'SX-7.2',
    priority: 'Medium',
    queueAge: '10h 20m',
    thumbnailUrl: '/case-08-thumb.png',
    videoUrl: '/case-08-video.mp4',
    status: 'Pending',
    caption: 'Private celebration ✨ Friday night energy.',
    duration: '0:09',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'Restrict Recommendation',
    confidence: '83%',
    detectedSignals: [
      'Sexualized movement pattern',
      'Adult private-party context',
      'Suggestive presentation',
    ],
    policyGuidance:
      'Sexualized adult presentation may warrant audience or recommendation controls depending on explicitness, framing and context.',
  },
  {
    id: 'TT-SG-260905-025634',
    num: '09',
    creator: '@medskills.lab',
    policy: 'Shocking & Graphic Content',
    policyId: 'SG-6.3',
    priority: 'Low',
    queueAge: '22h 40m',
    thumbnailUrl: '/case-09-thumb.png',
    videoUrl: '/case-09-video.mp4',
    status: 'Pending',
    caption: 'Basic wound-care demonstration for first-aid trainees.',
    duration: '0:09',
    language: 'English',
    market: 'Singapore',
    queueSource: 'AI Detected',
    recommendedAction: 'No Action',
    confidence: '74%',
    detectedSignals: [
      'Wound-like imagery',
      'Medical treatment action',
      'Blood-like visual material',
    ],
    policyGuidance:
      'Medical, educational or simulated graphic material may receive different treatment when context clearly establishes instructional purpose and limited severity.',
  },
  {
    id: 'TT-SG-260905-026712',
    num: '10',
    creator: '@urbanstuntlab',
    policy: 'Physical Risk & Imitation',
    policyId: 'PR-4.2',
    priority: 'Top',
    queueAge: '54m',
    thumbnailUrl: '/case-10-thumb.png',
    videoUrl: '/case-10-video.mp4',
    status: 'Pending',
    caption: 'Think you can copy this? Your turn. 😈',
    duration: '0:09',
    language: 'English',
    market: 'India',
    queueSource: 'AI Detected',
    recommendedAction: 'Remove Content',
    confidence: '94%',
    detectedSignals: [
      'High-impact stunt behavior',
      'Explicit imitation encouragement',
      'No visible controlled environment',
    ],
    policyGuidance:
      'High-risk conduct presented in a way that encourages imitation may require enforcement, particularly when no controlled environment or meaningful safety measures are visible.',
  },
];

export const POLICY_CATEGORIES = [
  'Physical Risk & Imitation',
  'Regulated Goods & Services',
  'Hate Speech & Hateful Behavior',
  'Harassment & Bullying',
  'Shocking & Graphic Content',
  'Body Exposure & Sexualized Behaviors',
  'Integrity & Authenticity',
  'Suicide & Self-Harm',
] as const;


export const POLICIES: PolicyStandard[] = [
  {
    id: 'PR-4.2',
    name: 'Physical Risk & Imitation',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Tier 1 Safety Standard',
    purpose:
      'Prohibit content that encourages, depicts, or provides actionable instructions for dangerous activities, stunts, challenges, or physical feats that present an imminent risk of severe physical injury, permanent impairment, or death, particularly where actions can be easily replicated or imitated by youth or general audiences.',
    reviewConsiderations: [
      'Imitation feasibility: high-risk physical actions utilizing readily accessible everyday environments, household tools, or vehicles without safety gear or protective barriers.',
      'Dangerous heights and structures: unauthorized scaling, climbing, or dangling from construction cranes, industrial bridges, communications towers, or rooftop ledges without safety tethering.',
      'Viral physical challenges: stunts involving asphyxiation, intentional hypoxia, fire ignition, ingesting caustic chemicals or hazardous non-edible substances, vehicle hopping, or electrical hazards.',
      'Youth vulnerability: activities involving minors or likely to appeal to younger audiences where physical danger is minimized, trivialized, or presented as a social dare.',
      'Vehicle stunts: reckless driving, speeding in pedestrian zones, hanging from moving vehicle exteriors, or tampering with transit infrastructure.',
    ],
    contextualConsiderations: [
      'Professional athletics, extreme sports competitions, and certified acrobatic performances conducted in controlled facilities with specialized safety gear and medical personnel.',
      'Cinematic stunt work, staged dramatic productions, and fictional entertainment where safety rigging, digital effects, or theatrical production contexts are clearly apparent.',
      'Educational documentaries, public health warnings, and investigative journalism exposing hazardous trends to discourage participation, provided instructional details are not provided.',
      'Action threshold: Apply Age-Gate 18+ or Contextual Warning when professional supervision or artistic context exists but imitation potential remains moderate. Enforce immediate Content Removal when dangerous copycat imitation is demonstrated or encouraged without safeguards.',
    ],
    enforcementGuidance:
      'Content depicting easily duplicated acts with imminent risk of severe injury requires immediate removal. Where professional safeguards or clear educational warnings are verified, apply age-gating or viewer advisories in accordance with platform distribution rules.',
  },
  {
    id: 'HC-2.1',
    name: 'Hate Speech & Hateful Behavior',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Core Community Standard',
    purpose:
      'Ensure an inclusive, safe platform by prohibiting attacks, dehumanization, harassment, exclusion, or incitement to violence or hatred against individuals or groups based on protected characteristics including race, ethnicity, national origin, religion, caste, sexual orientation, sex, gender identity, serious disease, disability, or immigration status.',
    reviewConsiderations: [
      'Dehumanizing comparisons: equating protected groups to animals, insects, vermin, filth, bacteria, diseases, or subhuman entities.',
      'Generalizations of criminality or inferiority: claims that an entire protected class is genetically, morally, or intellectually inferior, corrupt, or biologically predisposed to violence.',
      'Glorification or justification of violence: celebrating, endorsing, or denying genocides, mass atrocities, recognized hate crimes, or state-sponsored persecutions.',
      'Hateful symbols and slurs: explicit use of recognized slurs, dog whistles, white-supremacist emblems, neo-Nazi insignias, or ideological hate group manifestos.',
      'Denial of essential rights: advocating for the deportation, disenfranchisement, segregated access, or social exclusion of protected groups.',
    ],
    contextualConsiderations: [
      'Counterspeech and reclamation: individuals or organizations explicitly exposing, analyzing, or condemning hateful rhetoric.',
      'First-person community reclamation of historically derogatory terms within consensual group discussions without derogatory intent.',
      'Academic historical analysis, journalistic reporting, and legal proceedings covering hate incidents in the public interest.',
      'Action threshold: Immediate Content Removal for direct hate speech, slurs, or incitement. Escalate coordinated hate campaigns for network-level review. Retain journalistic and counterspeech content with contextual warning when educational value is established.',
    ],
    enforcementGuidance:
      'Zero-tolerance removal standard for content promoting violence, dehumanization, or systemic exclusion against protected groups. Content providing factual documentary coverage of hate incidents must clearly condemn the behavior to remain on the platform.',
  },
  {
    id: 'HB-3.4',
    name: 'Harassment & Bullying',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Safety & Well-being Standard',
    purpose:
      'Protect individuals from targeted intimidation, persistent abuse, humiliation, malicious exposure of private data, and coordinated mass attacks designed to degrade human dignity or silence participation.',
    reviewConsiderations: [
      'Targeted personal degradation: persistent attacks mocking an individual’s physical appearance, voice, medical condition, bereavement, or personal tragedy.',
      'Doxxing and private information exposure: publishing non-public residential addresses, phone numbers, personal email addresses, national identity numbers, private financial records, or intimate communications without consent.',
      'Coordinated brigading and dogpiling: urging followers or third parties to mass-comment, harass, file false reports, or attack an individual across social channels.',
      'Severe shaming of minors: zero-tolerance protections shielding adolescents from cyberbullying, schoolyard humiliation, non-consensual recordings, or exclusion lists.',
      'Sexually explicit insults: unwanted sexualized commentary, graphic harassment, or digitally manipulated imagery intended to demean.',
    ],
    contextualConsiderations: [
      'Public figure accountability: legitimate criticism, political discourse, satire, and commentary regarding public actions of politicians, executives, and high-profile figures.',
      'Consensual creator banter: collaborative roasting or comedic skits where prior mutual consent and established social rapport are evident.',
      'Victim testimony: individuals sharing personal experiences of harassment to seek community support or raise awareness without retaliatory doxxing.',
      'Action threshold: Enforce Content Removal for doxxing, persistent targeting, or minor harassment. Restrict recommendations or apply viewer warnings for borderlines regarding public figures.',
    ],
    enforcementGuidance:
      'Prioritize user safety over engagement. If content targets private individuals with malicious intent, remove promptly. For high-profile public figures, balance free expression with protections against incitement to offline harm.',
  },
  {
    id: 'RG-5.1',
    name: 'Regulated Goods & Services',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Compliance & Legal Standard',
    purpose:
      'Prevent the facilitation, promotion, direct sale, exchange, or illegal trade of strictly regulated, controlled, or hazardous goods and services, including illicit substances, weapons, unapproved pharmaceuticals, and predatory financial schemes.',
    reviewConsiderations: [
      'Illicit drugs and controlled substances: promotion, facilitation of sale, manufacturing guides, or trading of illegal narcotics, prescription drugs, synthetic stimulants, or drug paraphernalia.',
      'Weapons and explosives: offering, selling, or showing the assembly of firearms, ammunition, high-capacity magazines, silencers, explosive devices, or 3D-printing blueprints for untraceable weapons.',
      'Tobacco and nicotine products: marketing, selling, or promoting e-cigarettes, vaping devices, or tobacco to underage audiences or offering direct transaction channels.',
      'Deceptive financial services: multi-level marketing scams, guaranteed-yield pyramid schemes, fraudulent binary trading, or predatory unverified cryptocurrency solicitations.',
      'Endangered flora and fauna: trade in protected wildlife species, ivory, exotic animal parts, or unauthorized biological specimens.',
    ],
    contextualConsiderations: [
      'Public health campaigns, medical harm reduction programs, and addiction recovery resources discussing drug risks without commercial facilitation.',
      'Authorized licensed commercial brand accounts operating in jurisdictions with age verification for legal tobacco/alcohol advertising.',
      'Historical weapons demonstrations, certified museum showcases, and legal shooting sports in licensed facilities.',
      'Action threshold: Remove Content immediately for illicit drug, weapon, or unauthorized financial sales. Restrict recommendations or age-gate legitimate alcohol or sporting content.',
    ],
    enforcementGuidance:
      'Strict prohibition of peer-to-peer commerce and vendor links for controlled items. All promotional material linking to external marketplaces for regulated products must be removed immediately.',
  },
  {
    id: 'SG-6.3',
    name: 'Shocking & Graphic Content',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Media Sensitivity Standard',
    purpose:
      'Prevent exposure to gratuitously violent, gruesome, repulsive, or morbid imagery that causes severe emotional distress, desensitization, or psychological trauma, while preserving legitimate public-interest and educational journalism.',
    reviewConsiderations: [
      'Severe physical trauma: visible mutilation, severed limbs, decapitation, open bone fractures with massive hemorrhaging, or active physical torture.',
      'Fatal accidents and disasters: unblurred footage of fatal traffic collisions, airplane crashes, industrial machinery fatalities, or collapsed building victim recovery.',
      'Animal cruelty: intentional abuse, torture, staged animal combat (such as cockfighting or dogfighting), or gruesome animal killing outside sanctioned culinary or veterinary contexts.',
      'Severe bodily fluids and decomposition: close-up depictions of decomposing human remains, festering wounds, or gratuitous biological gore.',
      'Sensationalist jump scares: content intentionally engineered with sudden jarring audio-visual horrors designed to induce acute distress.',
    ],
    contextualConsiderations: [
      'Accredited surgical education and medical demonstrations utilizing training silicone pads, clinical models, or controlled operating room footage for medical professionals.',
      'Public-interest journalism, conflict reporting, and human rights monitoring documenting warfare, civil unrest, or historic events where public awareness is crucial.',
      'Theatrical special effects, professional cinema makeup, Halloween prosthetics, and artistic fiction with clear staging cues.',
      'Action threshold: Remove Content for gratuitous gore, real-world executions, or animal torture. Add Viewer Warning and Age-Gate 18+ for legitimate news coverage or clinical medical education.',
    ],
    enforcementGuidance:
      'Distinguish gratuitous shock value from educational and journalistic necessity. Clinical simulations, synthetic wound models, and verified conflict reporting should be protected with appropriate viewer warnings rather than platform-wide removal.',
  },
  {
    id: 'SX-7.2',
    name: 'Body Exposure & Sexualized Behaviors',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Age-Appropriate Ecosystem Standard',
    purpose:
      'Maintain an age-appropriate viewing ecosystem by prohibiting explicit pornography, non-consensual sexual media, overt genital exposure, and commercial sexual exploitation, while respecting artistic, educational, maternal, and athletic expressions.',
    reviewConsiderations: [
      'Explicit sexual acts: intercourse, oral sex, masturbation, or explicit simulations of sexual acts with visible contact.',
      'Genital exposure and full nudity: uncovered genitalia, exposed buttocks without full coverage, or bare female nipples outside authorized exceptions.',
      'Commercial sexual exploitation: prostitution facilitation, escort directory promotion, or solicitations for paid intimate webcam sessions.',
      'Non-consensual sexual content: upskirting, hidden camera recordings, intimate media leaked without consent, or synthetic sexual deepfakes.',
      'Child sexual exploitation and abuse: absolute zero-tolerance policy requiring immediate permanent suspension and referral to authorities.',
    ],
    contextualConsiderations: [
      'Maternal care and health: infant breastfeeding, lactation education, natural childbirth documentaries, and clinical obstetric consultations.',
      'Visual arts and museum heritage: classical fine art sculptures, historic Renaissance paintings, and anthropological cultural exhibitions.',
      'Athletic activities: appropriate attire in sporting environments such as competitive swimming, gymnastics, bodybuilding posing, and track events.',
      'Action threshold: Immediate Content Removal for explicit sexual acts, commercial solicitations, or non-consensual imagery. Apply Age-Gate 18+ for adult suggestive dance choreography or fine art partial nudity.',
    ],
    enforcementGuidance:
      'Uphold community decency standards without censoring benign cultural, maternal, or athletic expressions. Contextual framing, camera focus, and underlying intent determine the boundary between permissible art and violative sexualization.',
  },
  {
    id: 'IA-8.1',
    name: 'Integrity & Authenticity',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Platform Trust Standard',
    purpose:
      'Preserve user trust and the integrity of public information by curbing coordinated deception, malicious synthetic media (deepfakes), impersonation of figures or institutions, and fraudulent schemes that mislead the public on critical civic matters.',
    reviewConsiderations: [
      'Deceptive synthetic media (AI deepfakes): fabricated audio or video portraying public figures, election officials, or private citizens making false statements regarding critical civic, health, or security emergencies without disclosure.',
      'Account impersonation: creating profiles that deceptively mimic real individuals, official government ministries, verified news agencies, or corporate entities.',
      'Coordinated inauthentic behavior: bot farms, mass automated account networks, astroturfing campaigns, or artificially manipulated engagement metrics.',
      'Financial fraud and phishing: deceptive giveaways, fake investment endorsements by public figures, credential theft portals, or malware distribution.',
      'Civic process disruption: false information concerning voting procedures, election dates, voter eligibility, polling place locations, or emergency disaster instructions.',
    ],
    contextualConsiderations: [
      'Political parody, satire, and comedic caricature where the humorous or fictitious nature is immediately evident to a reasonable observer.',
      'Transparent creative use of AI filters, synthetic avatar production, voice-over synthesis, and artistic editing clearly labeled by the creator.',
      'Investigative journalism exposing misinformation operations or demonstrating synthetic generation techniques for educational awareness.',
      'Action threshold: Enforce Content Removal for deceptive civic interference, financial scams, or malicious impersonation. Apply Contextual Warning or Restrict Recommendations for unlabeled AI media with potential for public confusion.',
    ],
    enforcementGuidance:
      'Protect authentic public discourse from automated distortion and deceptive synthesis. Transparent labels are required on realistic AI-generated material that could reasonably mislead viewers about real-world events.',
  },
  {
    id: 'SH-9.2',
    name: 'Suicide & Self-Harm',
    status: 'Active',
    frameworkVersion: '2026.09',
    revisionInfo: 'Effective September 2026 · Immediate Intervention Standard',
    purpose:
      'Prevent the depiction, promotion, romanticization, live-streaming, or instructional sharing of suicide, self-injurious acts, or eating disorders, while providing supportive intervention pathways and crisis helpline resources to vulnerable users.',
    reviewConsiderations: [
      'Depiction or promotion of suicide: showing acts of suicide, intentional self-poisoning, hanging, suffocation, or severe intentional physical self-injury.',
      'Instructional sharing: providing specific lethal dosages, suicide preparation checklists, self-harm suicide pacts, or dangerous physical challenges promoting asphyxiation.',
      'Eating disorder promotion: content celebrating severe emaciation, sharing extreme caloric starvation guides, purging tutorials, or glorifying anorexia/bulimia as lifestyle ideals.',
      'Farewell messages and notes: distributing suicide notes, final goodbye messages with active suicidal ideation, or morbid location photography.',
      'Romanticization: presenting self-harm as an aesthetic, poetic coping mechanism, or desirable peer trend.',
    ],
    contextualConsiderations: [
      'Recovery testimonials, resilience narratives, and mental health awareness where individuals share overcoming past crises without showing fresh wounds or disclosing methods.',
      'Professional clinical discussions, suicide prevention helpline campaigns, and educational content directing users to professional medical support.',
      'Memorial tributes honoring deceased loved ones that do not disclose suicide methods or romanticize the act.',
      'Action threshold: Immediate Content Removal and critical crisis escalation for active suicide threats or instructions. Provide crisis support helpline card overlays to the viewer.',
    ],
    enforcementGuidance:
      'Highest-priority emergency escalation protocol. Content indicating imminent self-harm must trigger immediate removal, account restriction, and delivery of localized emergency crisis response resources.',
  },
];

/**
 * Resolves a case's policyId or policy name to one of the 8 canonical PolicyStandards.
 */
export function resolvePolicyStandard(
  policyId?: string,
  policyName?: string
): PolicyStandard {
  if (policyId) {
    // Exact ID match
    const exact = POLICIES.find(
      (p) => p.id.toLowerCase() === policyId.toLowerCase()
    );
    if (exact) return exact;

    // Code prefix match: e.g. "PR" matches "PR-4.2", "SG" matches "SG-6.3"
    const prefix = policyId.toUpperCase();
    const byPrefix = POLICIES.find((p) => {
      const pCode = p.id.split('-')[0]; // 'PR', 'HC', etc.
      return prefix.includes(pCode);
    });
    if (byPrefix) return byPrefix;
  }

  if (policyName) {
    const byName = POLICIES.find(
      (p) => p.name.toLowerCase() === policyName.toLowerCase()
    );
    if (byName) return byName;

    // Partial name match
    const partial = POLICIES.find(
      (p) =>
        policyName.toLowerCase().includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().includes(policyName.toLowerCase())
    );
    if (partial) return partial;
  }

  // Fallback default: PR-4.2 Physical Risk & Imitation (Entry A default)
  return POLICIES[0];
}


// -----------------------------------------------------------------------------
// Brand, moderator profile, and workflow option data
// -----------------------------------------------------------------------------
export const TING_TING_BRAND = {
  name: 'TING TING',
  productName: 'SAFETY REVIEW',
  policyCenterName: 'TING TING POLICY CENTER',
  logoUrl: APPROVED_LOGO_URL,
} as const;

export const MAYA_PROFILE = {
  name: 'Maya Tan',
  employeeId: 'TT-SG-CM-02418',
  role: 'Content Moderator',
  avatarUrl: MAYA_AVATAR_URL,
} as const;

export const FINAL_ACTION_OPTIONS: { action: FinalAction; description: string }[] = [
  { action: 'NO ACTION', description: 'Content remains available' },
  { action: 'REMOVE CONTENT', description: 'Remove from platform' },
  { action: 'AGE-GATE 18+', description: 'Restrict to adult viewers' },
  { action: 'RESTRICT RECOMMENDATION', description: 'Limit from recommendation surfaces' },
  { action: 'ADD VIEWER WARNING', description: 'Apply contextual viewing notice' },
  { action: 'ESCALATE REVIEW', description: 'Send for specialist review' },
];

export const POLICY_BASIS_OPTIONS = [...POLICY_CATEGORIES];

export const CONTEXT_BASIS_OPTIONS = [
  'Staged / fictional context',
  'Educational context',
  'Professional activity',
  'Cultural / ceremonial context',
  'Public-interest context',
  'Policy threshold not met',
  'Insufficient evidence',
  'Viewer protection without removal',
  'Specialist review required',
] as const;

// -----------------------------------------------------------------------------
// Policy Center framework overview content
// -----------------------------------------------------------------------------
export const POLICY_FRAMEWORK_OVERVIEW = {
  frameworkVersion: '2026.09',
  frameworkName: 'Ting Ting Safety Standards',
  status: 'ACTIVE',
  referenceSubtitle: 'Safety Standards Reference',
  title: 'POLICY FRAMEWORK OVERVIEW',
  purpose:
    'The Ting Ting Safety Standards framework establishes consistent, transparent, and objective criteria for evaluating short video content across all global discovery and recommendation feeds. This comprehensive policy architecture balances creative expression and community well-being through calibrated, evidence-based review determinations.',
  desktopReviewConsiderations: [
    { title: 'Contextual Totality', text: 'Evaluate content within its complete narrative, audio, visual, and cultural framing rather than through isolated moments.' },
    { title: 'Harm Prevention Priority', text: 'Prioritize immediate protection on content involving physical danger, severe violence, self-harm, or child exploitation.' },
    { title: 'Proportional Intervention', text: 'Apply the least restrictive treatment necessary to mitigate risks while safeguarding public-interest discourse and educational utility.' },
    { title: 'Equitable Consistency', text: 'Apply uniform standard thresholds across all creators regardless of follower count, commercial status, or geographical location.' },
  ],
  mobileReviewConsiderations: [
    { title: 'Contextual Totality', text: 'Evaluate content within its complete narrative, audio, visual, and cultural framing.' },
    { title: 'Harm Prevention Priority', text: 'Prioritize immediate protection on physical danger, violence, self-harm, or child exploitation.' },
    { title: 'Proportional Intervention', text: 'Apply the least restrictive treatment necessary to mitigate risks.' },
    { title: 'Equitable Consistency', text: 'Apply uniform standard thresholds across all creators.' },
  ],
  desktopPossibleTreatments:
    'Moderation assessments under the Safety Standards framework result in one of six calibrated treatments: No Action (content conforms to community standards), Add Viewer Warning (pre-playback advisory interstitial), Age-Gate 18+ (restricted to verified adult audiences), Restrict Recommendation (excluded from public discovery feeds), Remove Content (platform-wide removal for confirmed violations), or Escalate Review (referral to senior regional policy specialists for nuanced or unprecedented cases).',
  mobilePossibleTreatments:
    'Moderation assessments under the Safety Standards framework result in one of six calibrated treatments: No Action, Add Viewer Warning, Age-Gate 18+, Restrict Recommendation, Remove Content, or Escalate Review.',
} as const;

// -----------------------------------------------------------------------------
// About Ting Ting fictional company content
// -----------------------------------------------------------------------------
export const ABOUT_TING_TING = {
  modalTitle: 'ABOUT TING TING',
  modalSubtitle: 'Company & Vision',
  heroLabel: 'GLOBAL EXPRESSION PLATFORM',
  brandName: 'TING TING',
  taglineLines: ['Short video.', 'Global expression.', 'Responsible discovery.'],
  founder: {
    name: 'Elon Srinivasan',
    role: 'Founder & CEO',
    imageUrl: '/founder_elon_srinivasan.jpg',
    alt: 'Elon Srinivasan, Founder & CEO',
  },
  whoWeAre: [
    'Ting Ting is a global short-form video platform for creativity, entertainment, learning and cultural expression.',
    'People use Ting Ting to discover ideas, share moments and connect through video.',
  ],
  mission: 'To make creative expression easy to discover, share and enjoy across cultures.',
  principles: [
    { title: 'CREATIVITY', description: 'Give people space to create, experiment and share ideas in their own voice.' },
    { title: 'COMMUNITY', description: 'Help people find shared interests, conversations and communities through video.' },
    { title: 'RESPONSIBILITY', description: 'Build experiences that encourage thoughtful participation and long-term trust.' },
    { title: 'GLOBAL CONNECTION', description: 'Make it easier for ideas, culture and creativity to move across borders.' },
  ],
  globalPresenceIntro: 'Ting Ting operates across major creative and technology hubs around the world.',
  globalPresence: [
    { region: 'ASIA PACIFIC', offices: ['Singapore', 'Tokyo', 'Seoul', 'Sydney'], headquarters: 'Singapore' },
    { region: 'EUROPE', offices: ['London', 'Berlin'], headquarters: null },
    { region: 'AMERICAS / MIDDLE EAST', offices: ['New York', 'Toronto', 'São Paulo', 'Dubai'], headquarters: null },
  ],
  closingEntity: 'TING TING TECHNOLOGIES',
  closingLine: 'Building a platform where creativity can travel further.',
} as const;

// -----------------------------------------------------------------------------
// Community Guidelines fictional content
// -----------------------------------------------------------------------------
export const COMMUNITY_GUIDELINE_CATEGORIES = [
  {
    id: 'hate-speech',
    number: 1,
    title: 'Hate Speech & Hateful Behavior',
    summary:
      'We do not permit attacks, dehumanizing speech, incitement to hatred, or slurs targeting individuals or groups based on protected characteristics including race, ethnicity, national origin, religion, sexual orientation, gender identity, sex, serious illness, or disability.',
    prohibited: [
      'Dehumanizing comparisons, claims of genetic inferiority, or calls for exclusion or segregation.',
      'Using hate symbols, targeted slurs, or derogatory epithets directed at protected groups.',
      'Praising, promoting, or celebrating historical atrocities, hate groups, or supremacist ideologies.',
      'Inciting bias, discrimination, or coordinated harassment campaigns against marginalized communities.',
    ],
    exceptions:
      'Content raising awareness, documenting prejudice for educational purposes, condemning hate speech, or analyzing hateful rhetoric in news or documentary formats is allowed when the creator clearly states critical or counterspeech intent.',
  },
  {
    id: 'harassment-bullying',
    number: 2,
    title: 'Harassment & Bullying',
    summary:
      'We want Ting Ting to be a welcoming environment where creators can share their voice without fear of intimidation, persistent degradation, unwanted sexualization, or coordinated cyberbullying.',
    prohibited: [
      'Directing abusive language, threats, or severe personal insults toward private individuals.',
      'Coordinating mass negative commenting, trolling, or targeted pile-ons against any user.',
      'Creating parody accounts or modified media designed to demean, humiliate, or harass someone.',
      'Sharing manipulated imagery to degrade someone or making non-consensual remarks regarding appearance.',
    ],
    exceptions:
      'Critical discussions, political commentary, and good-faith critiques of public figures, artists, and prominent leaders are permitted provided they do not cross into direct threats, doxxing, or dehumanization.',
  },
  {
    id: 'physical-risk',
    number: 3,
    title: 'Physical Risk & Imitation',
    summary:
      'To prevent preventable real-world accidents and harm, we do not allow content depicting, promoting, or encouraging dangerous physical stunts or high-risk challenges that could easily be imitated and cause severe bodily injury.',
    prohibited: [
      'High-risk physical dares, dangerous vehicular maneuvers, or reckless amateur stunts without safety equipment.',
      'Encouraging viewers, especially youth, to replicate hazardous activities with everyday household items.',
      'Consuming toxic, caustic, or non-food substances as part of an internet stunt or challenge.',
      'Dangerous tampering with electrical fixtures, heights, railway tracks, or moving machinery.',
    ],
    exceptions:
      'Professional extreme sports, regulated stunt performances with safety gear, circus and martial arts exhibitions, and certified stunt education are permitted with clear contextual signals and viewer warnings.',
  },
  {
    id: 'shocking-graphic',
    number: 4,
    title: 'Shocking & Graphic Content',
    summary:
      'Ting Ting is a global discovery platform viewed by diverse audiences. We prohibit excessively graphic, gory, gratuitously violent, or gruesome imagery that serves no clear informational or artistic purpose.',
    prohibited: [
      'Graphic depictions of severe human suffering, open wounds, dismemberment, or fatal accidents.',
      'Gratuitous violence against humans, cruelty to animals, or blood sports.',
      'Torture, violent armed conflicts without journalistic framing, or gruesome medical procedures shown for shock value.',
      'Videos uploaded solely to provoke disgust, revulsion, or panic among viewers.',
    ],
    exceptions:
      'Journalistic coverage of newsworthy events, educational medical training, museum historical exhibits, and documentary archives may be permitted with appropriate age-gating (18+) and sensitive content warning screens.',
  },
  {
    id: 'body-exposure',
    number: 5,
    title: 'Body Exposure & Sexualized Behaviors',
    summary:
      'We maintain strict community standards regarding sexually explicit content, nudity, and sexualized conduct to protect community members and keep the platform comfortable for a broad audience.',
    prohibited: [
      'Explicit sexual acts, pornography, depictions of sexual violence, or solicitation of adult services.',
      'Full frontal nudity, exposure of genitalia, buttocks, or uncovered female breasts outside artistic/medical contexts.',
      'Sexually suggestive gestures or focus on private body parts intended for erotic stimulation.',
      'Non-consensual sexual content, upskirting, or sharing intimate media without explicit subject consent.',
    ],
    exceptions:
      'Artistic representations in classical painting, sculpture, traditional cultural dress, health education, breastfeeding, and medical childbirth are recognized as legitimate expression when appropriately tagged.',
  },
  {
    id: 'regulated-goods',
    number: 6,
    title: 'Regulated Goods & Services',
    summary:
      'We prohibit the sale, advertising, trading, or facilitation of legally restricted, controlled, or illicit substances and goods directly on the platform.',
    prohibited: [
      'Facilitating sales, direct transactions, or sourcing links for firearms, ammunition, or explosives.',
      'Selling or offering illegal drugs, prescription medications, or controlled chemicals.',
      'Promoting unverified pharmaceuticals, counterfeit goods, or protected wildlife products.',
      'Direct peer-to-peer advertising for unregulated tobacco products, e-cigarettes, or gambling services to minors.',
    ],
    exceptions:
      'Educational discussions regarding the history of regulations, museum collections of historic firearms, anti-substance abuse advocacy, and certified cessation programs are permitted.',
  },
  {
    id: 'integrity-authenticity',
    number: 7,
    title: 'Integrity & Authenticity',
    summary:
      'We believe trust is essential for discovery. We do not permit deceptive practices, financial scams, identity misrepresentation, or synthetic media intended to mislead the public on matters of significant consequence.',
    prohibited: [
      'Phishing schemes, advance-fee frauds, pyramid schemes, or deceptive crypto investments.',
      'Impersonating another person, organization, or public official to mislead viewers or extort money.',
      'Distributing maliciously altered deepfakes or synthetic media that falsely depict individuals saying or doing things without disclosure.',
      'Fabricated public emergencies, falsified disaster warnings, or voter suppression schemes.',
    ],
    exceptions:
      'Satire, parody, clearly labeled comedic impersonations, and AI-generated creative art are welcomed when transparently disclosed to viewers.',
  },
  {
    id: 'suicide-self-harm',
    number: 8,
    title: 'Suicide & Self-Harm',
    summary:
      'We care deeply about the mental health and physical safety of our global community. We do not permit content that depicts, encourages, instructs, or glorifies suicide, self-harm, or dangerous disordered eating behaviors.',
    prohibited: [
      'Depicting acts of self-harm, cutting, or acts that cause deliberate bodily injury.',
      'Sharing instructional materials, suicide pacts, or encouragement of suicidal ideation.',
      'Glorifying extreme calorie deprivation, purging techniques, or promoting dangerous eating disorder challenges.',
      'Mocking or trivializing individuals in psychological distress or experiencing self-harm.',
    ],
    exceptions:
      'Personal recovery stories, mental health awareness campaigns, crisis support resource sharing, and educational discussions on overcoming grief and distress are supported with prominent crisis helpline overlays.',
  },
  {
    id: 'privacy-safety',
    number: 9,
    title: 'Privacy & Personal Safety',
    summary:
      'Every individual has a right to privacy and digital peace of mind. We prohibit the unauthorized distribution of personally identifiable information that threatens anyone’s physical safety or security.',
    prohibited: [
      'Publishing residential addresses, personal telephone numbers, private email addresses, or government IDs without consent (doxxing).',
      'Sharing private medical records, banking data, passwords, or personal login credentials.',
      'Filming individuals in private spaces where there is a reasonable expectation of privacy (restrooms, private bedrooms, fitting rooms).',
      'Using drone cameras or surveillance equipment to stalk, track, or harass community members.',
    ],
    exceptions:
      'Recording events in public spaces where no reasonable expectation of privacy exists is generally permissible, provided it complies with local laws and does not constitute targeted harassment.',
  },
  {
    id: 'authentic-participation',
    number: 10,
    title: 'Authentic Platform Participation',
    summary:
      'To preserve a fair and genuine discovery ecosystem, we prohibit artificial manipulation, bot networks, and deceptive engagement tactics that distort community recommendations.',
    prohibited: [
      'Operating automated bot farms to inflate views, likes, shares, comments, or follower counts.',
      'Distributing repetitive, unsolicited promotional spam or mass unwanted direct messages.',
      'Creating multiple coordinated accounts to evade restrictions or manipulate trend algorithms.',
      'Selling, buying, or trading account credentials or engagement metrics.',
    ],
    exceptions:
      'Legitimate multi-account management for separate creative personas, business brands, or collaborative channels is fully supported.',
  },
];

export const COMMUNITY_RESPONSE_TREATMENTS = [
  {
    name: 'NO ACTION',
    badgeClass: 'bg-[#F2EFE9] text-[#4A3B31] border-[#D9D3C7]',
    description:
      'Content conforms to community standards and remains fully discoverable across the platform without restriction.',
  },
  {
    name: 'REMOVE CONTENT',
    badgeClass: 'bg-[#FBEBEB] text-[#932F2F] border-[#E8C4C4]',
    description:
      'Content violates community standards and is permanently removed from public view and recommendation channels.',
  },
  {
    name: 'AGE-GATE 18+',
    badgeClass: 'bg-[#FFF6E5] text-[#965A18] border-[#EAD5B5]',
    description:
      'Content contains mature creative themes or adult dialogue; viewing is restricted to verified accounts aged 18 and older.',
  },
  {
    name: 'RESTRICT RECOMMENDATION',
    badgeClass: 'bg-[#F7F3EB] text-[#785C3A] border-[#DECBB4]',
    description:
      'Content is ineligible for algorithmic discovery in public feeds, but remains viewable on the creator’s profile page.',
  },
  {
    name: 'ADD VIEWER WARNING',
    badgeClass: 'bg-[#F4F1EA] text-[#635343] border-[#DACFC2]',
    description:
      'A sensitive content advisory interstitial is placed before playback, allowing viewers to choose whether to watch.',
  },
  {
    name: 'ESCALATE REVIEW',
    badgeClass: 'bg-[#F5EFE6] text-[#7A5B3E] border-[#D6C1A8]',
    description:
      'Nuanced, unprecedented, or high-consequence cases are referred to senior regional policy specialists for in-depth evaluation.',
  },
];

export const COMMUNITY_GUIDELINES_COPY = {
  standardName: 'Ting Ting Community Standards',
  heroEyebrow: 'TING TING COMMUNITY STANDARDS',
  heroTitleLine1: 'CREATE FREELY.',
  heroTitleLine2: 'PARTICIPATE RESPONSIBLY.',
  intro:
    'Ting Ting is built for creative discovery, cultural expression, and shared joy. Our Community Guidelines set clear expectations for how people discover, create, and interact respectfully across our global platform.',
  contextMatters:
    'We believe meaningful communication depends on context. When evaluating content, we examine creator intent, cultural nuance, artistic presentation, educational value, and public interest before determining how standards apply.',
  principles: [
    { title: 'SAFETY', description: 'Protecting members of our community from harm, intimidation, physical danger, and exploitative behavior.' },
    { title: 'RESPECT', description: 'Fostering an inclusive space where diverse cultures, backgrounds, and perspectives are treated with basic dignity.' },
    { title: 'AUTHENTICITY', description: 'Ensuring interactions, identities, and media shared on Ting Ting are genuine, transparent, and trustworthy.' },
    { title: 'AGE-APPROPRIATE PARTICIPATION', description: 'Creating safe boundaries and age-suitable experiences so teens and younger audiences can discover responsibly.' },
  ],
  standardsIntro: 'Detailed guidelines outlining acceptable expression and prohibited behaviors across all ten core content areas.',
  responseTitle: 'HOW TING TING MAY RESPOND',
  responseIntro: 'When content is reviewed, we apply proportionate measures reflecting the nature, severity, and context of the material.',
  contextualReviewIntro:
    'Content moderation is rarely black and white. Because expression carries different meanings in different settings, our review teams evaluate multiple holistic factors before reaching conclusions:',
  contextualReviewFactors: [
    { title: 'Creator Intent', desc: 'Is the creator genuinely seeking to harm, educate, parody, or raise awareness?' },
    { title: 'Surrounding Dialogue', desc: 'What is spoken or communicated across the full duration of the video?' },
    { title: 'Captions & Descriptions', desc: 'Do on-screen text, hashtags, and descriptions clarify context or intent?' },
    { title: 'Staged Context', desc: 'Is the performance demonstrably comedic, theatrical, or choreographed fiction?' },
    { title: 'Educational Purpose', desc: 'Does the video provide legitimate instructional or informative value?' },
    { title: 'Professional Context', desc: 'Are participants licensed professionals operating in supervised settings?' },
    { title: 'Cultural Context', desc: 'Does the behavior reflect recognized regional traditions or artistic conventions?' },
    { title: 'Public-Interest Value', desc: 'Does the content shed light on a newsworthy event or matter of civic debate?' },
    { title: 'Likelihood of Imitation', desc: 'Could impressionable viewers easily duplicate hazardous acts at home?' },
    { title: 'Severity of Possible Harm', desc: 'What is the potential real-world consequence if harm occurs?' },
  ],
  reporting: {
    title: 'REPORTING CONTENT',
    body: 'Community members play an active role in keeping Ting Ting safe. If you encounter a video, comment, or account that you believe violates these Community Guidelines, you can report it directly within the app by tapping the Share menu and selecting “Report”.',
    note: 'All reports are confidential, and reported accounts are not notified of who submitted the report.',
  },
  appeals: {
    title: 'APPEALS',
    body: 'We recognize that mistakes can occur when evaluating nuanced content. If your video has been removed or restricted and you believe the decision was made in error, you can submit an appeal through your Creator Studio Notification Center.',
    note: 'Appeals are reviewed by independent senior moderation specialists not involved in the original review.',
  },
  applicationPrinciples: [
    { title: 'CONTEXT MATTERS', description: 'We evaluate videos within their complete narrative, artistic, and cultural context rather than making mechanical or isolated determinations.' },
    { title: 'PROPORTIONAL RESPONSE', description: 'Enforcement actions are calibrated to the actual severity, intent, and risk of harm rather than applying a one-size-fits-all penalty.' },
    { title: 'CONSISTENCY MATTERS', description: 'Standards are applied fairly and uniformly across all creators, regardless of follower count, popularity, or geographic location.' },
    { title: 'UNCERTAINTY SHOULD BE REVIEWED', description: 'When content sits on nuanced boundaries, expert human reviewers evaluate the broader context before final decisions are made.' },
  ],
  framework: {
    name: 'TING TING COMMUNITY GUIDELINES',
    version: '2026.09',
    status: 'Active',
    lastUpdated: 'September 2026',
  },
} as const;

// -----------------------------------------------------------------------------
// Footer fictional content
// -----------------------------------------------------------------------------
export const FOOTER_CONTENT = {
  brandName: 'TING TING',
  tagline: 'Short video. Global expression. Responsible discovery.',
  contacts: [
    { label: 'Safety Operations', phone: '+65 6818 2400', email: 'safety@tingting.example' },
    { label: 'General Enquiries', phone: '+65 6818 2000', email: 'hello@tingting.example' },
  ],
  globalOffices: [
    { region: 'Asia Pacific', offices: ['Singapore — Headquarters', 'Tokyo', 'Seoul', 'Sydney'] },
    { region: 'Europe', offices: ['London', 'Berlin'] },
    { region: 'Americas / Middle East', offices: ['New York', 'Toronto', 'São Paulo', 'Dubai'] },
  ],
  copyright: '© 2026 Ting Ting Technologies. All rights reserved.',
} as const;
