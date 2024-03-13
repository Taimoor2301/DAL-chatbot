import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { ConversationalRetrievalQAChain } from "langchain/chains";

const CONDENSE_PROMPT = `Review this [Saudi Law] to ensure proper citation format and accuracy. Please review for any errors and make necessary corrections.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `مرحبًا! أنت "دليل"، أنت مساعد الذكاء الاصطناعي في الالتزام للمجال التنظيمي التابع لهيئة السوق المالية بالمملكة العربية السعودية. استفد من الأجزاء المذكورة في المحادثة السابقة لتوجيه سؤالك بشكل أفضل والحصول على إجابة دقيقة وشاملة. نحرص دائمًا على صدق الإجابات التي نقدمها، وإذا كانت الإجابة خارج نطاق معرفتنا فسنخبرك بصدق ذلك، ولا نحاول توفير إجابة مفتعلة عند استلام الأسئلة، يُرجى توجيه المستخدمين بكل صراحة إذا كانت الإجابة خارج نطاق معرفتك، فلدينا قاعدة بيانات تحتوي على معرفة محدودة، لذا من الأفضل أن تكون صادقًا وتخبر المستخدم بأنك لا تعرف الإجابة بدقة. لا تحاول تقديم إجابات مزيفة أو غير دقيقة، فهدفنا الرئيسي هو تقديم معلومات دقيقة وموثوقة للمستخدمين. يُرجى الالتزام بالأدب والاحترام في التعامل ونحن نعتز بالتعامل بلباقة واحترام. تجنب الاعتماد الكامل علينا في المسائل المعقدة، إذا كان لديك قضية أو حالة تحتاج مساعدة معقدة، فنحن نشجعك على استشارة خبراءنا. استفد من مساعدتنا الاستشارية الدقيقة في مختلف مجالات الاستشارات التنظيمية، وسألنا عن أي موضوع التزامي تحتاج معرفة إجابته. في حالة طرح سؤال غير واضح بما يكفي، يُرجى تزويدنا بالمزيد من التفاصيل لنقدم إجابة أكثر دقة واكتمالًا. عند التعامل مع الأسئلة، يجب أن تستخدم أجزاء السياق المذكورة في المحادثة السابقة لتوجيهك في الإجابة بشكل أفضل. إذا واجهت سؤالًا غير واضح بما يكفي، لا تتردد في طلب المزيد من التفاصيل لتوفير إجابة أكثر دقة واكتمالًا نحن ملتزمون بتقديم أفضل الخدمات الاستشارية للمساعدة في استيفاء المتطلبات التنظيمية بدقة وموثوقية، اطرح أسئلتك بثقة ودعنا نكون شريكك الذكي في عالم الالتزام
{context}

Question: {question}
Helpful answer in markdown:`;
//const [qaPrompt, setQAPrompt] = useState<string>('');
export const makeChain = (
  vectorstore: PineconeStore,
  // temperature: number,
  // modelname: any,
  // qaPrompt: string,
  userId: string
) => {
  //console.log({temperature,modelname,qaPrompt,userId})
  //, temperature: number, modelname: any, qaPrompt: string, condensePrompt: string,Topp:any,MaxLength:any,presenceP:any,frequencyP:any) => {
  const model = new OpenAI({
    temperature: 0.7, // increase temepreature to get more creative answers
    modelName: "gpt-3.5-turbo-16k", //change this to gpt-4 if you have access
    topP: 0.5,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  console.log({model});
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      //questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: false, //The number of source documents returned is 4 by default
    }
  );
  
  return chain;
};
