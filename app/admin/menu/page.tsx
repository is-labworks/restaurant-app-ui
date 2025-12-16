"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/i18n";
import { menuItemsData } from "@/lib/mock-data";

export default function MenuManagementPage() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  // Initialize with a consistent default to avoid hydration mismatch
  const [items, setItems] = useState(menuItemsData.vi);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<
    (typeof menuItemsData.vi)[0] | null
  >(null);

  // Update items when language changes
  useEffect(() => {
    setItems(menuItemsData[language]);
  }, [language]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t("menuManagementLabel")}
            </h1>
            <p className="text-muted-foreground mt-1">{t("manageDishes")}</p>
          </div>
          <Button
            onClick={() => {
              setEditingItem(null);
              setShowModal(true);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus size={16} className="mr-2" />
            {t("addItem")}
          </Button>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder={t("searchMenuItems")}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">{t("filter")}</Button>
        </div>

        {/* Items Table */}
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                    {t("image")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                    {t("name")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                    {t("category")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                    {t("price")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                    {t("status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover bg-muted"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.categoryId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      ₫{item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          item.inStock
                            ? "bg-success/20 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.inStock
                          ? `✓ ${t("active")}`
                          : `✗ ${t("inactive")}`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setEditingItem(item);
                            setShowModal(true);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-error hover:text-error/80"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6 border-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  {editingItem ? t("editMenuItem") : t("addMenuItem")}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {t("itemName")}
                  </label>
                  <Input
                    placeholder={language === "vi" ? "Phở Bò" : "Pho Bo"}
                    defaultValue={editingItem?.name}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {t("category")}
                  </label>
                  <Input
                    placeholder={
                      language === "vi" ? "Món chính" : "Main Course"
                    }
                    defaultValue={editingItem?.categoryId}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {t("price")}
                  </label>
                  <Input
                    placeholder="65000"
                    defaultValue={editingItem ? `${editingItem.price}` : ""}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {t("description")}
                  </label>
                  <textarea
                    placeholder={t("itemDescription")}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {t("uploadImage")}
                  </label>
                  <Button variant="outline" className="w-full text-sm">
                    {t("chooseFile")}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="available"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="available"
                    className="text-sm text-foreground"
                  >
                    {t("available")}
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  {t("cancel")}
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t("save")}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
