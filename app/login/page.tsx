"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") || "manager"
  const { login } = useAuth()
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(initialRole)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const roleConfig = {
    staff: {
      label: t("kitchenStaff"),
      icon: "👨‍🍳",
      redirectPath: "/kitchen",
    },
    manager: {
      label: t("manager"),
      icon: "👔",
      redirectPath: "/manager",
    },
    admin: {
      label: t("administrator"),
      icon: "⚙️",
      redirectPath: "/admin/menu",
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Mock validation - in production, this would validate against a backend
      if (!username || !password) {
        throw new Error(t("fillAllFields"))
      }

      if (password.length < 6) {
        throw new Error(t("passwordMinLength"))
      }

      await login(username, password, role)
      router.push(roleConfig[role as keyof typeof roleConfig].redirectPath)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  const currentRoleConfig = roleConfig[role as keyof typeof roleConfig]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      {/* Back Button */}
      <div className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">{t("goBack")}</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-0 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="text-5xl mb-4">{currentRoleConfig.icon}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("systemLogin")}
            </h1>
            <p className="text-muted-foreground">{currentRoleConfig.label}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg flex gap-3">
              <AlertCircle size={18} className="text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                {t("username")}
              </label>
              <Input
                type="text"
                placeholder={t("enterUsername")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-base"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                {t("password")}
              </label>
              <Input
                type="password"
                placeholder={t("enterPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                {t("selectRole")}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-base bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="staff">👨‍🍳 {t("kitchenStaff")}</option>
                <option value="manager">👔 {t("manager")}</option>
                <option value="admin">⚙️ {t("administrator")}</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2.5 text-base"
            >
              {loading ? t("loggingIn") : t("login")}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="pt-6 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-3 text-center uppercase">
              {t("demoCredentials")}
            </p>
            <div className="bg-secondary rounded-lg p-4 space-y-2 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold">{t("username")}:</span>{" "}
                <span className="text-foreground">demo</span>
              </div>
              <div>
                <span className="font-semibold">{t("password")}:</span>{" "}
                <span className="text-foreground">password123</span>
              </div>
              <div>
                <span className="font-semibold">{t("selectRole")}:</span>{" "}
                <span className="text-foreground">{t("asNeeded")}</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              ← {t("backToHome")}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
          {getTranslation("loading", "en")}
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
