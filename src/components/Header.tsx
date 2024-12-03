import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = ({
  categories,
  onCategoryChange,
}: {
  categories: string[];
  onCategoryChange: (category: string | null) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>("All");
  const [activeSubCategories, setActiveSubCategories] = useState<string[] | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const subCategories: Record<string, string[]> = {
    Avatar: ["Human-like", "Anthro & Furry", "Robot & Cyborgs", "Others", "All in Avatars"],
    Fashion: ["Clothes", "Accessories", "Others", "All in Fashion"],
    All: [],
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
    if (isDropdownOpen) {
      setActiveCategory(null);
      setActiveSubCategories(null);
    }
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      //show all products
      onCategoryChange(null);
      setActiveSubCategories(null);
    } else {
      setActiveSubCategories(subCategories[category] || null);
    }
  };

  const handleSubCategorySelect = (subCategory: string) => {
    onCategoryChange(subCategory);
    setIsDropdownOpen(false);
    setActiveCategory(null);
    setActiveSubCategories(null);
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
      <Image
      src='/images/logo.png'
      alt='test logo'
      className="logoImage"
      width={100}
      height={20}
    />
      </div>

      <div className={styles.searchBar}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Keyword</label>
          <input type="text" placeholder="Search here" />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Category</label>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              type="button"
              className={styles.dropdownButton}
              onClick={toggleDropdown}
            >
              {activeCategory || "Select Category"}
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownBox}>
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={styles.dropdownItem}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
                {activeSubCategories && activeSubCategories.length > 0 && (
                  <div className={styles.subDropdownBox}>
                    {activeSubCategories.map((subCategory) => (
                      <div
                        key={subCategory}
                        className={styles.dropdownItem}
                        onClick={() => handleSubCategorySelect(subCategory)}
                      >
                        {subCategory}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <button className={styles.searchBtn}>
          <Image
            src='/images/icons/search.png'
            alt='filter icon'
            width={40}
            height={40}
          />
        </button>
      </div>

      
      <div className={styles.circleIcon}>
        <Image
          src='/images/icons/filter.png'
          alt='filter icon'
          width={15}
          height={15}
        />
      </div>
      <div>
        <p>List your creation</p>
      </div>
      <div className={styles.icons}>
      <Image
        src='/images/icons/globe.png'
        alt='language icon'
        width={20}
        height={20}
       />
        <div className={styles.groupUser}>
          <button>☰</button>
          <button>
          <Image
            src='/images/icons/profile.png'
            alt='profile icon'
            width={20}
            height={20}
          />
          </button>
        </div>
        <button>
        <Image
            src='/images/icons/cart.png'
            alt='cart icon'
            width={20}
            height={20}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
