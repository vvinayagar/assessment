import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { } from "primereact/blockui";
import { DataView, DataViewLayoutOptions, DataViewLayoutType } from 'primereact/dataview';
import { Tag } from "primereact/tag";
import CustomSelect from "./controls/CustomsSelect";
import { ProgressSpinner } from 'primereact/progressspinner';

interface Props {
  // Define the props interface here
}

interface Post {
  id: string;
  title: string;
  publishedDate: string;
  categories: Categories[];
  author: Author;
}

interface Author {
  name: string;
  avatar: string;
}

interface Categories {
  id: string;
  name: string;
}

interface Select {
  label: string;
  value: string;
}

const App: React.FC<Props> = () => {


  const [categories, setCategories] = useState<Select[]>([]);
  const [posts, setPosts] = useState<any>();
  const [layout, setLayout] = useState('grid');
  const [filter, setFilter] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {

      //Get Data
      let response = await axios.get("/api/posts/");

      //Separate Post Data
      let posts: any = response.data["posts"];
      let pst: Post[] = [];

      let cats: Select[] = [];

      //Separate all categoried

      posts.map((post: Post) => {

        let ccat = post.categories;
        ccat.map((cat: Categories) => {
          var findItem = cats.find((x: Select) => x.label === cat.name);
          if (!findItem) {
            cats.push({ label: cat.name, value: cat.name });
            //select.push();
          }

        });

        console.log(filter);

        if (filter.length != 0 && ccat.find(x => filter.contains(x.name))) {
          //debugger;
          console.log("Pusing Filter");
          pst.push(post);
        }
        else {
          pst.push(post);
        }

        setCategories(cats);
        // setSelect
      });
      
      // Set all post
      setPosts(pst);

    };

    getData();
  }, []);

  const renderListItem = (data: any) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img src={data.author.avatar}
            onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
            alt={data.name} />
          <div className="product-list-detail">
            <div className="product-name">{data.title}</div>
            <div className="product-name">{data.author.name}</div>
            <div className="product-description">{data.summary}</div>

            <i className="pi pi-tag product-category-icon"></i><span className="product-category">
              {data.categories.map((ct: Categories) => {

                return (<Tag value={ct.name} className="mr-2 mb-2" />)

              })}
            </span>
          </div>
          <div className="product-list-action">
           
          </div>
        </div>
      </div>
    );
  }

  const renderGridItem = (data: any) => {
    return (
      <div className="col-12 md:col-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.categories.map((ct: Categories) => {

                return (<Tag value={ct.name} className="mr-2 mb-2" />)

              })}</span>
            </div>
          
          </div>
          <div className="product-grid-item-content">
            <img src={data.author.avatar} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
            <div className="product-name">{data.title}</div>
            <div className="product-name">{data.author.name}</div>
            <div className="product-description">{data.summary}</div>
          
          </div>
          <div className="product-grid-item-bottom">
         
          </div>
        </div>
      </div>
    );
  }

  const itemTemplate = (posts: Post, layout: any) => {

    console.log('Rendering....');
    if (!posts) {
      return;
    }
    //debugger;
    if (filter.length != 0) {
      //debugger;
      let exist = false;
      posts.categories.map((s: Categories) => {
      filter.map((x:String) => {
        if(x == s.name){
          //debugger;
          exist = true;
        }
      })
      });
      if (!exist)
        return <></>;
    }

    if (layout === 'list')
      return renderListItem(posts);
    else if (layout === 'grid')
      return renderGridItem(posts);
  }

  const setCustomFilter = (filter: any) => {
    console.log("Custom filter");
    console.log(filter);
    setLoading(true);
    setFilter(filter);
    setLoading(false);
  }

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">

        <div className="col-6" style={{ textAlign: 'right' }}>
          <DataViewLayoutOptions layout={layout as (DataViewLayoutType)} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  }

  return <div>

    <div className="content-section introduction">
      {/* <Tags data={categories} /> */}
      <CustomSelect data={categories} onChange={setCustomFilter} />
      <div className="card">
        <div className="row">
          { loading? <ProgressSpinner />:
          <DataView value={posts} layout={layout as (DataViewLayoutType)} header={renderHeader()}
            itemTemplate={itemTemplate} paginator rows={9}
            loading={loading}
          // sortOrder={sortOrder} sortField={sortField} 
          />}
        </div>
      </div>
    </div>
  </div>;
}

export default App;
