import ChatSettings from "@/componentsCopy/chat-settings";
import ChatUI from "@/componentsCopy/chat-ui";
import initiateClient from "@/lib/api";

export default async function ShopPage() {
  const client = initiateClient();
  async function getChatConfig() {
    const { data, error } = await client.GET("/api/v1/chat/config", {
      cache: "no-store",
    });
    if (error) {
      console.log(error);
      // return [];
    }
    return data;
  }
  const chatConfig = await getChatConfig();
  return (
    <div className="flex flex-col h-[calc(100vh_-_theme(spacing.16))] w-full">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold pl-5">Shopping Companion</h1>
        <ChatSettings chatConfig={chatConfig}/>
      </div>
      <ChatUI/>
    </div>
  );
}
