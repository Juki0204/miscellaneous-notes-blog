import Link from 'next/link';

import React from 'react';
import * as Icon from 'react-feather';
//icons => https://feathericons.com/


export default function SideBar({category,tags}) {
    return (
      <div className="sidebar">
        <div className="profile">
          <h2 className="profile_ttl">Profile</h2>
          <div className="profile_img">
            <img src="/img/profile.jpg" alt="プロフィール画像" />
          </div>
          <p className="profile_name">なおまる</p>
          <p className="profile_info">WEBデザイナーに転職して早4年。元パチンコ店マネジャー。最近はフロントエンド（React/Next.js）も触ってます。<br />
          あと趣味でクワガタの飼育もやってます。ブログ記事は主にWEB関係と趣味の雑記になると思います。
          </p>
        </div>
        <div className="category">
            <h2 className="category_ttl">Category</h2>
            <ul className="category_list">
              {category.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>
                      {category.name}
                  </Link>
                </li>
            ))}
            </ul>
        </div>
        <div className="tags">
            <h2 className="tags_ttl">Tags</h2>
            <ul className="tags_list">
              {tags.map((tags) => (
                <li key={tags.id}>
                <Link href={`/tags/${tags.id}`}>
                  <Icon.Tag width={16} height={16} />{tags.tags}
                </Link>
                </li>
            ))}
            </ul>
        </div>

        <style jsx>{`
          .sidebar{
            grid-area: sidebar;
            display: grid;
            grid-template-areas: "profile"
                                 "category"
                                 "tags";
            grid-template-rows: min-content min-content min-content;
            width: 400px;
            padding: 10px 20px;
            background: #fff;
            box-shadow: 1px 1px 3px #999;
            border-radius: 8px;
          }

          .profile{
            grid-area: profile;
            padding: 20px 10px 10px;
            border: solid #ddd;
            border-width: 0 0 1px;
            margin: 0 0 10px;
          }

          .profile_img{
            width: 100px;
            height: 100px;
            border-radius: 50px;
            overflow: hidden;
            position: relative;
            margin: 0 auto;
            background-color: #ddd;
          }

          .profile_img img{
            width: 100%;
            height: auto;
          }

          .profile_name{
            text-align: center;
            margin: 5px auto;
            font-weight: bold;
          }

          .profile_info{
            font-size: 14px;
            text-align: justify;
            margin: 5px auto;
          }

          .category{
            grid-area: category;
          }

          .profile_ttl, .category_ttl, .tags_ttl{
            width: 100%;
            margin: 0 auto 10px;
            font-size: 18px;
          }

          .category_list, .tags_list{
              margin: 0 0 20px;
          }

          .category_list li, .tags_list li{
            background: #eee;
            cursor: pointer;
            border-left: 4px solid #999;
            border-radius: 4px;
            transition: .3s all ease;
            box-shadow: 1px 1px 3px #aaa;
          }

          .tags_list li{
            display: inline-block;
            margin-right: 10px;
          }

          .category_list li a, .tags_list li a{
            display: flex;
            justify-content: left;
            align-items: center;
            padding: 10px;
            gap: 0 5px;
          }

          .category_list li:hover, .tags_list li:hover{
            transform: scale(1.03);
          }
      
          .category_list li:not(:last-child),
          .tags_list li:not(:last-child){
            margin-bottom: 10px;
          }

          .tags{
            grid-area: tags;
          }

          @media screen and (max-width:1000px){
            .sidebar{
              width: 100%; 
              max-width: none; 
              grid-template-areas: "category"
                                   "tags"
                                   "profile";
            } 

            .profile{
              border-width: 1px 0 0;
              margin: 10px auto 0;
            }
          }
        `}</style>

      </div>
    )
}