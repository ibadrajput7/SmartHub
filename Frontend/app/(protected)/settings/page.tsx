'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Shield, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { signout } from "@/app/login/actions"

export default function SettingsPage() {
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white/90 tracking-tight">
          Settings
        </h1>
        
        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button 
              variant="outline" 
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20 hover:text-purple-100 w-full sm:w-auto"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Button>
            
            <form action= {signout} method="POST">
              <Button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white transition-colors w-full sm:w-auto"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>

          <AnimatePresence>
            {showPrivacy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="prose prose-invert prose-purple max-w-none space-y-6 bg-purple-950/20 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-2xl font-semibold text-purple-100">Privacy Policy</h2>
                  <p className="text-purple-200/90">
                  Welcome to Smarthub! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                  </p>
                  <h3 className="text-xl font-semibold text-purple-100">Information We Collect</h3>
                  <p className="text-purple-200/90">
                  We collect personal and non-personal information to improve your experience:

                   a. Personal Information:
                  Account Details: Name, email address, and password for account creation.
                  Usage Data: Interactions with the platform.
                  Uploaded Content: Audio files, videos, and text inputs provided by users.

                  b. Non-Personal Information:
                  Device Information: Browser type, operating system, and IP address.
                  Analytics Data: To understand platform performance and improve services.
                  </p>
                  <h3 className="text-xl font-semibold text-purple-100">How We Use Your Information</h3>
                  <p className="text-purple-200/90">
                  We use collected information for the following purposes:

                  Account Management: To create and manage user accounts.
                  Service Delivery: To provide features like note generation, quizzes, and summaries.
                  Platform Improvement: To analyze usage patterns and improve functionality.
                  Communication: To send updates, support messages, and important notifications.
                  </p>
                  <h3 className="text-xl font-semibold text-purple-100">Data Protection</h3>
                  <p className="text-purple-200/90">
                  We implement security measures to protect your data, including encryption, secure servers, and access controls. However, no internet-based service can be 100% secure.
                  </p>
                  <h3 className="text-xl font-semibold text-purple-100">User Rights</h3>
                  <p className="text-purple-200/90">
                  You have the right to:

                  Access and Update Data: Review and correct personal data.
                  Data Deletion: Request account deletion and data removal.
                  Withdraw Consent: Opt-out of data collection where applicable
                  </p>
                  <h3 className="text-xl font-semibold text-purple-100">Cookies and Tracking Technologies</h3>
                  <p className="text-purple-200/90">
                  We use cookies and similar technologies to enhance user experience and collect analytics data. You can adjust cookie preferences through browser settings.
                  </p>
                  <h3 className="text-xl font-semibold text-purple-100">Changes to This Policy</h3>
                  <p className="text-purple-200/90">
                  We reserve the right to update this Privacy Policy. Changes will be communicated through platform notifications or emails.
                  </p>
                  <h3 className="text-xl font-semibold text-purple-100">Contact Us</h3>
                  <p className="text-purple-200/90">
                  If you have any questions or concerns about this Privacy Policy, please contact us at:

                  Email: support@smarthub.com
                  Thank you for trusting Smarthub. We are committed to protecting your privacy and ensuring a safe, secure, and productive experience on our platform.
</p>



                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

